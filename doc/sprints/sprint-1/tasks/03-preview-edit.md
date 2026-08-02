# 03 — Preview + правки текста/порядка

Минимальный редактор на shared slides: увидеть карусель и поправить текст/порядок.

**Фича:** F2.2 (текст/порядок) · **Зависимости:** tasks 01–02

## Scope

- Preview слайдов через shared components (scale на экране, логический размер 1080×1350)
- Edit headline / body / CTA активных types
- Reorder слайдов; минимум 2 слайда (hook + cta) если delete появится позже
- Save → Zod validation → Neon (draft/generated; versions — по возможности совместимо с S3)
- Без drag-Canva, stickers, Brand Theme picker, add произвольных types (расширение — S4)

## Done when

- [ ] Preview обновляется после сохранения
- [ ] Битый JSON не сохраняется; ошибка понятна пользователю
- [ ] Порядок слайдов сохраняется и используется client ZIP
- [ ] Нет полного layout/theme picker (это Sprint 4)

## Связанные документы

- [editor-flow.md](../../../product/editor-flow.md)
- [carousels.md](../../../product/carousels.md)
