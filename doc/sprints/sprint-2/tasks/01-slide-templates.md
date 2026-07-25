# 01 — Первые slide templates

Реализовать минимальный набор компонентов, достаточный для проверки качества результата, а не весь будущий редактор.

**Основа F1.3 · Зависимости:** Sprint 0 meta/schema, Sprint 1 fixtures

## Scope

- 3 визуальных стиля из meta
- Минимум 3 структурных templates: Mistakes, Expert List, Checklist
- Layouts, реально используемые этими templates: cover, text, checklist, CTA и один image-capable layout
- Общие typography, spacing и safe-area tokens для 1080×1350

## Done when

- [ ] Компоненты получают только валидированный project JSON и theme tokens
- [ ] Один fixture каждого template визуально проходит cover/content/CTA sequence
- [ ] Длинный заголовок и максимальный body не выходят за safe area
- [ ] Кириллица и выбранные шрифты одинаково работают локально и на сервере
- [ ] Layout ids совпадают со схемой; неизвестный id завершается явной ошибкой
- [ ] Компоненты пригодны для будущего Remotion MP4 без второй дизайн-системы

## Связанные документы

- [Slide rendering engine](../../../product/slide-engine.md)
- [Рендер](../../../dev/RENDER.md)
