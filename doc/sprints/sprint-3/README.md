# Sprint 3 — варианты + старт итерации 2

**Статус:** запланирован · **Тест:** продолжение закрытого №1, 3–5 проектов на участника  
**Итерация брейншторма:** конец MVP-воронки + **подготовка** итерации 2 (схема и пресеты, без picker UI)

## Цель

1. Управляемый второй шаг после album: вариант / текст / стиль / ZIP.  
2. Заложить оси `layoutId` × Brand Theme и расширить цветовые пресеты до 6–8 — чтобы S4 включил picker без миграций.

**Roadmap:** завершение [этапа 1](../../roadmap/ROADMAP.md#1--png-в-telegram) · **Фичи:** F1.5, F1.6, F1.7 + подготовка F2.9  
**Спеки:** [brand-kits](../../product/brand-kits.md) · [slide-types](../../product/slide-types.md) · [layout-styles](../../product/layout-styles.md)

## Зависимости

- Sprint 2: стабильный album + telemetry + ответы теста (в т.ч. какой стиль выбирали).
- Gate «нужен ли результат?» — continue; иначе — смена гипотезы, не раздувание каталога.

## Чеклист

### Воронка этапа 1

- [ ] F1.5 — «Другой вариант», «Измени текст», «Другой стиль» ([task 01](./tasks/01-result-actions.md))
- [ ] F1.6 — immutable versions ([task 02](./tasks/02-project-versions.md))
- [ ] F1.5 — ZIP ([task 03](./tasks/03-zip-export.md))
- [ ] Промпты: паттерны types + качество по данным теста ([task 04](./tasks/04-prompt-quality.md))
- [ ] F1.7 — воронка и решение gate ([task 05](./tasks/05-funnel-feedback.md))

### Итерация 2 — подготовка (без Mini App)

- [ ] Схема `layoutId` × theme tokens; 3 текущих bundle = layout + default theme ([task 06](./tasks/06-layout-theme-schema.md))
- [ ] 6–8 цветовых пресетов (meta + «Другой стиль» / выбор в боте) ([task 06](./tasks/06-layout-theme-schema.md))
- [ ] Backlog S4 зафиксирован: Soft Pastel / Photo Overlay, types quote|myth_fact|big_number|steps, charts progress_bars|big_percent — **по данным выбора стилей из S2**, не все сразу

## Критерии выхода

- [ ] Пользователь сам делает вариант / меняет стиль / качает ZIP
- [ ] Повторный export привязан к immutable version
- [ ] Project JSON валидно описывает layout + theme по отдельности (или совместимый dual-read со старыми `themeId`)
- [ ] ≥6 цветовых пресетов доступны в боте без поломки 3 layout-характеров
- [ ] В ретро: go/no-go Mini App (S4) и приоритетный список types/styles/charts

## TBD

- «Редактировать» → waitlist до S4.
- Цены/лимиты — перед S5/S11.
- Soft Pastel / Photo Overlay **не** обязаны войти в S3 render — достаточно решения и слотов в meta, если тест не орёт «срочно».

## Не входит

Mini App editor, color picker UI, font pair picker, charts PNG, upload шрифтов, multi-theme на юзера, тарифы.

## Ретро

_(метрики · gate · входящий backlog Sprint 4)_
