# 04 — Минимальная схема Neon

Создать воспроизводимую основу хранения пользователей, проектов и фоновых задач.

**Фича:** F0.3 · **Зависимости:** task 02 (подключение Neon), task 01 (project JSON)

## Scope

- `users`: внутренний id, уникальный `telegram_id`, plan, created/updated timestamps
- `projects`: user id, type, title, status, JSON payload, created/updated timestamps
- `jobs`: project id, type, status, attempts, error, created/started/finished timestamps
- Первая versioned migration и минимальный seed/smoke script

## Решения

- Project JSON хранится целиком; нормализация scenes откладывается до доказанной необходимости.
- Бинарные PNG и будущие MP4 хранятся в Blob/S3, не в Postgres.
- `ProjectVersion`, `Asset` и `Export` добавляются в спринтах, где появляются версии и экспорт.

## Done when

- [ ] Миграция поднимает таблицы `users`, `projects`, `jobs` на пустой Neon database
- [ ] Foreign keys и индексы покрывают `telegram_id`, `user_id`, `project_id`, `status`
- [ ] Статусы ограничены enum/check constraints или общей типизированной схемой
- [ ] Smoke создаёт пользователя, проект и job, затем читает их обратно
- [ ] Повторный запуск migration не повреждает существующие данные
- [ ] В репозитории нет секретов и дампов production data

## Связанные документы

- [Архитектура: сущности БД](../../../project/ARCHITECTURE.md#сущности-бд-минимум)
- [ENV setup](../../../dev/ENV_SETUP.md)
