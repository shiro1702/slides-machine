# 02 — Расширение editor: add/delete

Текст и порядок — уже в Sprint 1. Здесь: add/delete слайдов.

**Фича:** F2.2 (расширение) · **Зависимости:** Sprint 1 task 03, Mini App или `/e/{id}`

## Scope

- Add слайд из разрешённых types (MVP + types v2 по готовности task 06)
- Delete с минимумом 2 слайдов (hook + cta)
- Сохранение → immutable version (S3)
- Без полного drag/stickers editor

## Done when

- [ ] Add/delete проходят Zod; битый JSON не сохраняется
- [ ] Preview, client ZIP (A) и re-export (B) используют новую version
- [ ] Текст/порядок из Sprint 1 не регрессируют

## Связанные документы

- [Sprint 1 — preview/edit](../../sprint-1/tasks/03-preview-edit.md)
