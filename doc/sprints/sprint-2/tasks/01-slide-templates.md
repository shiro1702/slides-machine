# 01 — Первые slide templates

Реализовать минимальный набор компонентов, достаточный для проверки качества результата, а не весь будущий редактор.

**Основа F1.3 · Зависимости:** Sprint 0 meta/schema, Sprint 1 fixtures

## Scope

- 3 визуальных стиля из meta
- Минимум 3 структурных templates: Mistakes, Expert List, Checklist
- Layouts: cover, text, checklist, CTA и один image-capable layout
- Typography, spacing, safe-area для 1080×1350
- **Чистый React:** нет `next/image`, `next/font`, data-fetch внутри слайда — одни props (theme + content)
- Шрифты из файлов пакета/репо — одинаково для Remotion и будущего html-to-image

## Done when

- [ ] Компоненты получают только валидированный project JSON и theme tokens
- [ ] Один fixture каждого template визуально проходит cover/content/CTA sequence
- [ ] Длинный заголовок и максимальный body не выходят за safe area
- [ ] Кириллица и выбранные шрифты одинаково работают локально и на сервере
- [ ] Layout ids совпадают со схемой; неизвестный id → явная ошибка
- [ ] Пригодны для Remotion `renderStill` **и** будущего client export / `renderMedia` без второй дизайн-системы

## Связанные документы

- [Slide rendering engine](../../../product/slide-engine.md)
- [Рендер (гибрид)](../../../dev/RENDER.md)
