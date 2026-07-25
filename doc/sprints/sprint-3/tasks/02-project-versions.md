# 02 — Версии проекта

Сохранить историю вариантов так, чтобы генерация и export никогда не перезаписывали опубликованный результат.

**Фича:** F1.6 · **Зависимости:** Sprint 0/1 DB, task 01

## Scope

- `project_versions`: project id, sequential number, source version/action, immutable JSON payload, created timestamp
- Active version на project или вычислимый current pointer
- Job/export всегда ссылается на version, а не только на project

## Done when

- [ ] Первая успешная генерация создаёт version 1
- [ ] Variant, text change и style change создают новую version транзакционно
- [ ] Старые версии остаются читаемыми и повторно экспортируемыми
- [ ] Concurrent actions не получают один version number и не теряют active pointer
- [ ] Job и Telegram delivery можно трассировать до точного JSON snapshot
- [ ] Миграция не ломает проекты Sprint 1–2 и создаёт им исходную version

## Связанные документы

- [Архитектура: сущности БД](../../../project/ARCHITECTURE.md#сущности-бд-минимум)
- [Минимальная схема Neon](../../sprint-0/tasks/04-neon-schema.md)
