# Pattaya

Мультиплеерная пошаговая веб-игра (настолка-бродилка) для мобильных браузеров.
Игрок создаёт игру и получает ссылку-id, другие заходят в сессию по этому id,
ход за ходом совершают действия — по сути конечный автомат, которым управляет
бэкенд.

> Статус: ранняя настройка окружения. Игровой код ещё не написан.

## Монорепозиторий

```
frontend/   React + TypeScript — клиент игры (создание/вход по id, отрисовка, ходы)
backend/    Node + TypeScript  — сервер: синхронизация участников + игровая логика
docs/        Архитектура, проектные решения (ADR), дизайн, схемы, процессы
```

Подробнее: [docs/architecture/overview.md](docs/architecture/overview.md) и
[docs/README.md](docs/README.md).

## Разработка

- **Трекер задач:** [beads](https://github.com/gastownhall/beads) (`bd`),
  синхронизируется через git как `.beads/issues.jsonl`. `bd ready` показывает
  свободные задачи. См. [docs/development/workflow.md](docs/development/workflow.md).
- **Запуск/деплой:** при пуше в `main` или активную ветку GitHub Actions
  (`.github/workflows/pages.yml`) публикует сайт на GitHub Pages.

## Превью

```
https://victormarty.github.io/Pattaya-project/
```

Открывается с телефона. Сейчас это страница-заглушка (hello-world); позже Pages
будет отдавать сборку фронтенда.

> Первичная настройка Pages (один раз): **Settings → Pages → Source: GitHub
> Actions**, репозиторий должен быть публичным.
