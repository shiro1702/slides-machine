# 06 — user_identities + статусы проекта

Подготовка multi-channel и editor-flow без второго мессенджера.

**Зависимости:** Neon schema S0 · [ARCHITECTURE](../../../project/ARCHITECTURE.md) · [BOT_MESSENGERS](../../../project/BOT_MESSENGERS.md)

## Scope

- Таблица `user_identities` (user_id, channel, channel_user_id) **или** явный migration-plan в doc + issue, если перенос откладывается до S4
- Существующих TG-юзеров сматчить как `channel=telegram`
- Enum/статусы project: как минимум документировать `draft | generated | editing | exported | rendering | delivered` (часть можно добавить в check constraint постепенно)
- Core/API оперирует `users.id`; чтение `telegram_id` только в adapter-слое (даже если пока в одном репо)

## Done when

- [ ] Новый контакт из TG создаёт user + identity (или эквивалент без поломки текущих строк)
- [ ] Документирован путь добавления `whatsapp` без изменения projects/tariffs schema
- [ ] Статусы проекта согласованы с [editor-flow.md](../../../product/editor-flow.md)
- [ ] Нет кода WA/VK адаптеров

## Не входит

Merge аккаунтов, второй webhook, capabilities UI для WA.
