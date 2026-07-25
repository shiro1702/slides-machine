# Sprint 0 — архитектура и скелет

**Статус:** в работе · **Юзеров не зовём**

## Цель

Заложить технический фундамент и каноническое ядро проекта: схему данных, базовые сущности, окружение и минимальный Telegram-вход.

**Roadmap:** [этап 0 — прототип ядра](../../roadmap/ROADMAP.md#0--прототип-ядра) · **Фичи:** F0.1–F0.7 в [FEATURES.md](../../project/FEATURES.md#sprint-0)

## Зависимости

Нет. Это стартовый спринт; достаточно одного Next.js app, без преждевременного выделения worker/monorepo.

## Чеклист

- [ ] F0.1 — JSON-схема: project, scenes, elements, background, timing, theme, export settings ([task 01](./tasks/01-json-schema.md))
- [ ] F0.2 — Next.js app задеплоен на Vercel ([task 02](./tasks/02-env-stack.md))
- [ ] F0.3 — Neon: users, projects, jobs и первая миграция ([task 04](./tasks/04-neon-schema.md))
- [ ] F0.4 — Blob smoke upload ([task 02](./tasks/02-env-stack.md))
- [ ] F0.5 — Telegram bot отвечает на `/start` через webhook ([task 02](./tasks/02-env-stack.md))
- [ ] F0.6 — форматы 1080×1080, 1080×1350 и 1080×1920 валидируются схемой ([task 01](./tasks/01-json-schema.md))
- [ ] F0.7 — 3 ниши, 5–7 шаблонов, 3 стиля и layouts enum описаны как meta ([task 03](./tasks/03-templates-meta.md))

Детальные таски: [tasks/](./tasks/).

## Критерии выхода

- [ ] Zod-схема и fixture проходят валидацию во всех трёх форматах
- [ ] Миграция Neon воспроизводимо создаёт `users`, `projects`, `jobs`
- [ ] Deploy preview доступен на Vercel; Blob smoke проходит
- [ ] Telegram `/start` отвечает из задеплоенного webhook
- [ ] Архитектура и meta не требуют Remotion/worker для запуска Sprint 1

## Не входит

Полный PNG-рендер, LLM-генерация, очередь в работе, Mini App и пользовательское тестирование.

## Ретро

_(в конце)_
