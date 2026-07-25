# Sprint 0 — архитектура и скелет

**Статус:** код готов · deploy/env — после секретов · **Юзеров не зовём**

## Цель

Заложить технический фундамент и каноническое ядро проекта: схему данных, базовые сущности, окружение и минимальный Telegram-вход.

**Roadmap:** [этап 0 — прототип ядра](../../roadmap/ROADMAP.md#0--прототип-ядра) · **Фичи:** F0.1–F0.7 в [FEATURES.md](../../project/FEATURES.md#sprint-0)

## Зависимости

Нет. Это стартовый спринт; достаточно одного Next.js app, без преждевременного выделения worker/monorepo.

## Чеклист

- [x] F0.1 — JSON-схема: project, scenes, elements, background, timing, theme, export settings ([task 01](./tasks/01-json-schema.md))
- [x] F0.2 — Next.js app (код + build); Vercel deploy после env ([task 02](./tasks/02-env-stack.md))
- [x] F0.3 — Neon: users, projects, jobs и первая миграция ([task 04](./tasks/04-neon-schema.md))
- [x] F0.4 — Blob smoke upload API ([task 02](./tasks/02-env-stack.md))
- [x] F0.5 — Telegram bot `/start` webhook handler ([task 02](./tasks/02-env-stack.md))
- [x] F0.6 — форматы 1080×1080, 1080×1350 и 1080×1920 валидируются схемой ([task 01](./tasks/01-json-schema.md))
- [x] F0.7 — 3 ниши, 5–7 шаблонов, 3 стиля и layouts enum описаны как meta ([task 03](./tasks/03-templates-meta.md))

Детальные таски: [tasks/](./tasks/).

## Критерии выхода

- [x] Zod-схема и fixture проходят валидацию во всех трёх форматах (`npm run validate:schema`)
- [x] Миграция Neon воспроизводимо создаёт `users`, `projects`, `jobs` (`drizzle/0000_init_users_projects_jobs.sql`)
- [ ] Deploy preview доступен на Vercel; Blob smoke проходит *(нужны env)*
- [ ] Telegram `/start` отвечает из задеплоенного webhook *(нужны env)*
- [x] Архитектура и meta не требуют Remotion/worker для запуска Sprint 1 (Player stub опционален)

## Не входит

Полный PNG-рендер, LLM-генерация, очередь в работе, Mini App и пользовательское тестирование.

## Ретро

_(в конце)_
