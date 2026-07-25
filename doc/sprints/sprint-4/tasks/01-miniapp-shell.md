# 01 — Mini App shell

Telegram Mini App: открытие из бота, user auth, каркас экранов.

**Фича:** F2.1 · **Зависимости:** Sprint 3 versions, TG bot deep-link

## Scope

- Кнопка «Редактировать» / «Открыть Mini App» из результата
- InitData validation, привязка к `users`
- Экраны: список слайдов проекта, заглушки под editor/theme
- HTML preview одного слайда (токены темы)

## Done when

- [ ] Только владелец проекта открывает editor
- [ ] Невалидный/просроченный initData отклоняется
- [ ] Deep-link открывает конкретный project + active version
