#!/bin/bash
# SessionStart hook — make the beads (bd) task tracker ready in Claude Code web sessions.
#
# Remote web sessions start from a fresh clone in an ephemeral container, where:
#   - the `bd` CLI is not installed (it's a global npm package), and
#   - the binary Dolt database under .beads/embeddeddolt/ is gitignored (absent), and
#   - git's core.hooksPath (which wires JSONL<->DB sync) is local config (unset).
#
# The single source of truth that DOES travel through git is the text file
# .beads/issues.jsonl. This hook reconstructs everything else from it:
#   1. install @beads/bd if missing
#   2. install bd git hooks (sets core.hooksPath -> .beads/hooks)
#   3. rehydrate the Dolt DB from .beads/issues.jsonl (only when missing)
#   4. emit beads agent context for the session
#
# All setup noise goes to stderr; stdout carries only bd's SessionStart context JSON.
set -euo pipefail

# Only run in Claude Code on the web (remote) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

log() { echo "[session-start] $*" >&2; }
cd "${CLAUDE_PROJECT_DIR:-.}"

# 1. Ensure the bd CLI is available.
if ! command -v bd >/dev/null 2>&1; then
  log "installing @beads/bd ..."
  if ! npm install -g @beads/bd 1>&2; then
    log "WARNING: bd install failed; tracker unavailable this session"
    exit 0
  fi
fi
log "using $(bd version 2>/dev/null | head -1)"

# 2. Wire bd's git hooks (idempotent; sets local core.hooksPath).
bd hooks install 1>&2 2>&1 || log "note: 'bd hooks install' skipped"

# 3. Rehydrate the DB from the git-tracked JSONL only when no DB is present,
#    so a resumed session never overwrites newer in-DB state with older JSONL.
if bd ping >/dev/null 2>&1; then
  log "beads DB already present"
else
  log "rehydrating beads DB from .beads/issues.jsonl"
  bd bootstrap 1>&2 2>&1 || log "note: 'bd bootstrap' skipped"
  [ -f .beads/issues.jsonl ] && { bd import 1>&2 2>&1 || log "note: 'bd import' skipped"; }
fi

# 4. Inject beads workflow context into the session (stdout).
bd prime --hook-json 2>/dev/null || true
