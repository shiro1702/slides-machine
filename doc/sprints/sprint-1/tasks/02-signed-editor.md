# 02 — Signed editor `/e/{id}`

Веб-вход в редактор без регистрации: JWT signed link из бота.

**Фича:** часть F2.1 (signed link) · **Зависимости:** task 01, фундамент users/projects

## Scope

- Маршрут `/e/{projectId}?t={jwt}`
- JWT payload: `{ userId, projectId, exp }` (или one-time session)
- Auth по `users.id`, не «только Telegram Login»
- Кнопка в боте после ready JSON: «Открыть редактор» → signed URL
- Отклонение: чужой user, просроченный/битый токен, несуществующий project

## Done when

- [ ] Владелец открывает свой project; чужой JWT → 403
- [ ] Просроченный токен не открывает editor
- [ ] Бот выдаёт рабочую ссылку после генерации JSON
- [ ] Mini App `initData` **не** обязателен в этом спринте (S4)

## Связанные документы

- [editor-flow.md — Auth](../../../product/editor-flow.md)
- [BOT_MESSENGERS.md](../../../project/BOT_MESSENGERS.md)
