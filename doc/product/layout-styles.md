# Layout styles (характер вёрстки)

Источник: [brainstorm 25.07.2026-styles-themes](../brainstorms/25.07.2026-styles-themes-INDEX.md).

**Layout Style** = КАК выглядит композиция: декор, плотность, характер типографики.  
Не путать с **Brand Theme** (цвета/шрифты пользователя) — см. [brand-kits.md](./brand-kits.md).

Любой [тип слайда](./slide-types.md) должен рендериться в любом layout-стиле.

## Каталог (целевой)

| # | id | Характер | Для кого | Когда |
|---|-----|----------|----------|-------|
| 1 | `clean_minimal` | Белый/серый, гротеск, один акцент, много воздуха | эксперты, B2B | MVP |
| 2 | `dark_premium` | Тёмный фон, крупный контраст, золото/бирюза, тонкие линии | наставники, финансы, премиум-недвижимость | MVP |
| 3 | `bold_marketing` | Яркий фон, uppercase, плашки, стрелки/стикеры | SMM, инфобиз, промо | MVP |
| 4 | `soft_pastel` | Пастель, мягкий вес, округлые формы | коучи, wellness, бьюти | S3–4 |
| 5 | `photo_overlay` | Фото + затемнение, крупный белый текст | риелторы, travel, до/после | S3–4 |
| 6 | `editorial` | Serif + гротеск, линии, «журнальная» вёрстка | личный бренд, лайфстайл | S5+ |
| 7 | `corporate` | Светло-синий, строгий гротеск, сетка/иконки | юристы, финансы, агентства | S5+ |
| 8 | `neon_tech` | Тёмный градиент, mono-акценты, glow/сетка | IT, AI, digital | S5+ |

## Конфиг = JSON-токены + декор-ассеты

Добавление стиля = новый JSON + пара декоративных ассетов, не отдельная кодовая ветка.

```json
{
  "id": "dark_premium",
  "name": "Dark Premium",
  "shapes": { "radius": 24, "decor": "gradient_blob" },
  "textCase": "normal",
  "padding": 96
}
```

Цвета и шрифты при разделении осей живут в **Brand Theme**; layout хранит характер (decor, radius, textCase, spacing). Пока в коде три bundled-стиля совмещают оба слоя — см. ниже.

## Соответствие текущему коду (Sprint 0–2)

В `lib/meta/styles.ts` пока один объект = layout + цвета + шрифты:

| Код сейчас | Ближайший целевой layout | Примечание |
|------------|--------------------------|------------|
| `expert_minimal` | `dark_premium` / `clean_minimal` | тёмный экспертный |
| `bright_marketing` | `bold_marketing` | яркий маркетинг |
| `premium_realestate` | смесь pastel + editorial | тёплый беж под недвижимость |

**Правило миграции:** не ломать `themeId` для тестеров Sprint 2. При разрезании осей:

- текущие 3 id остаются как **preset Brand Themes** (или layout+theme bundles);
- в project JSON появляются отдельные `layoutId` + `themeId` (или theme tokens inline);
- LLM и бот продолжают выбирать «стиль» как UX-ярлык, мапящий на пару layout×theme.

## MVP-объём

3 layout-стиля × 5 типов слайдов — достаточно для закрытого теста. Следующие стили — по данным выбора, не вслепую.

См. также: [slide-engine.md](./slide-engine.md) · [slide-types.md](./slide-types.md)
