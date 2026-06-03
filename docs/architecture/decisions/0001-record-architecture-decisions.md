# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-06-02

## Context

This project is developed largely autonomously and across many short sessions.
Decisions made early (hosting, frameworks, conventions) are easy to forget and
expensive to reverse. We need a durable, low-friction record of *why* things are
the way they are.

## Decision

We use **Architecture Decision Records (ADRs)** — one Markdown file per
significant decision, stored in `docs/architecture/decisions/`, numbered
sequentially (`NNNN-title.md`).

Each ADR has: Status, Date, Context, Decision, Consequences. ADRs are immutable
once accepted; to change a decision, add a new ADR that supersedes the old one
(note it in both).

We record a decision as an ADR when it is hard to reverse, affects structure, or
a future reader would reasonably ask "why was it done this way?".

## Consequences

- A newcomer (human or agent) can read the `decisions/` folder to understand the
  project's foundations.
- Small, reversible choices do **not** need an ADR — keep the signal high.
- The format is intentionally tool-free (plain Markdown in git).
