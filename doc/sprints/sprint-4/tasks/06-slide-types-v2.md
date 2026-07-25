# 06 — Slide types v2 + layout styles

**Фича:** F2.12 · **Зависимости:** S3 backlog приоритетов, render pipeline

## Scope

**Types (обязательный минимум итерации 2):**

- `quote`, `myth_fact`, `big_number`, `steps`

**Layout styles (по приоритету ретро S2–3):**

- Soft Pastel, Photo Overlay (Photo Overlay может требовать image asset — минимальный путь)

- Обновить LLM templates/prompts под новые types
- Meta + Zod enum + React/Remotion компоненты

## Done when

- [ ] Каждый новый type рендерится во всех MVP layout-стилях + новых, которые включили
- [ ] Fixture на каждый type проходит safe area / кириллицу
- [ ] Бот/Mini App могут добавить type в карусель без ручного JSON

## Связанные документы

- [slide-types.md](../../../product/slide-types.md)
- [layout-styles.md](../../../product/layout-styles.md)
