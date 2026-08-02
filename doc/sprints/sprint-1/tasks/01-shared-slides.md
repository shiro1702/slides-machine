# 01 — Shared slides (pure React)

Один набор компонентов слайдов для web preview, html-to-image и Remotion.

**Фича:** основа F2.4a / путь A · **Зависимости:** фундамент JSON, `remotion/layouts` из Sprint 2

## Scope

- Зафиксировать API: type + data + theme tokens + size → JSX
- Запрет в shared: `next/image`, `next/font`, fetch внутри компонента, Next-only CSS
- Шрифты — файлы из пакета/репо (`@font-face` / `staticFile`), не CDN
- Обёртки: web preview / html-to-image и Remotion Composition едят одно и то же
- Документировать путь пакета (`remotion/layouts` сейчас → позже `packages/slides`)

## Done when

- [ ] Layouts MVP (hook, text, numbered, checklist, cta) рендерятся без Next-магии
- [ ] Один fixture project визуально совпадает в HTML preview и в существующем Remotion/layout PNG
- [ ] Чеклист «нельзя в shared» в коде/доке и проходит review
- [ ] Шрифты грузятся локально; нет зависимости от внешнего CDN для текста

## Связанные документы

- [RENDER.md — Shared components](../../../dev/RENDER.md)
- [ARCHITECTURE.md](../../../project/ARCHITECTURE.md)
- [Sprint 2 task 01](../../sprint-2/tasks/01-slide-templates.md)
