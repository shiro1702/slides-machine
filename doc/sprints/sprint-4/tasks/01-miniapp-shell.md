# 01 — Mini App shell

Telegram Mini App: `initData` поверх signed editor из Sprint 1.

**Фича:** F2.1 (initData) · **Зависимости:** Sprint 1 signed `/e/{id}`, Sprint 3 versions

## Scope

- Кнопка «Открыть Mini App» из результата бота (рядом с signed link)
- InitData validation → `users.id`
- Экраны на базе Sprint 1 editor: список слайдов, preview, заглушки под theme picker
- Не дублировать html-to-image ZIP (уже Sprint 1)

## Done when

- [ ] Только владелец проекта открывает Mini App
- [ ] Невалидный/просроченный initData отклоняется
- [ ] Deep-link открывает конкретный project + active version
- [ ] Signed link из Sprint 1 продолжает работать без Mini App

## Связанные документы

- [Sprint 1 — signed editor](../../sprint-1/tasks/02-signed-editor.md)
- [editor-flow.md](../../../product/editor-flow.md)
