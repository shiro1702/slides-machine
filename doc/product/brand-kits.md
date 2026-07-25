# Brand kits и Brand Theme

Источник: brainstorm 25.07 + [styles-themes 25.07](../brainstorms/25.07.2026-styles-themes-INDEX.md).

**Brand Theme** — killer feature для SMM и агентств (5–10 клиентов → 5–10 тем). Основа дорогого тарифа.

## Архитектура: два слоя вместо одного «стиля»

| Слой | Кто задаёт | Что внутри |
|------|------------|------------|
| **Layout Style** | продукт | вёрстка, декор, композиция, характер → [layout-styles.md](./layout-styles.md) |
| **Brand Theme** | пользователь | цвета + font pair + лого + @handle |

`Layout × Theme × Slide type` — любая комбинация валидна.  
Шаблоны используют **только токены** (`var(--background)`, …), никогда хардкод hex.

```json
{
  "id": "theme_client_coffee",
  "name": "Кофейня Roast",
  "colors": {
    "background": "#F5EFE6",
    "surface": "#FFFFFF",
    "text": "#2B1D14",
    "textMuted": "#8A7A6D",
    "accent": "#C46A2B",
    "onAccent": "#FFFFFF"
  },
  "fontPair": "editorial_soft",
  "logo": "https://blob.../logo.png",
  "handle": "@roast.coffee",
  "darkVariant": false
}
```

В схеме данных кастомные токены закладываем **сразу**; в UI MVP — только пресеты. Тогда Agency Brand Kit включается без миграций.

## Сейчас (Sprint 0–2)

- 3 bundled-стиля в боте (`expert_minimal`, `bright_marketing`, `premium_realestate`) = layout + цвета + шрифты вместе  
- Без Brand Kit UI  
- Цель: пресеты выглядят как готовые темы; схема уже принимает inline `theme` tokens

## UX создания темы (по итерациям)

| Способ | Суть | Когда |
|--------|------|-------|
| 1. Пресеты | 6–30 палитр → сохранить под именем | MVP / S1–2 |
| 2. Свои цвета | picker: фон + акцент; muted/surface/onAccent — авто + контраст | S3–4 |
| 3. Из логотипа | upload → доминирующие цвета → 3 варианта палитры | S5–6 |
| 4. Из URL | сайт / Instagram клиента → цвета | позже |

`@handle` в теме → автоподстановка в `cta` (S3–4).  
Лого на слайдах — S5–6.

## Контраст (критично)

- WCAG текст ≥ **4.5:1**; иначе авто-коррекция или предупреждение  
- `onAccent` считаем сами, не отдаём в ручной picker  
- Плохой контраст пользователь воспримет как «продукт кривой»

## Шрифты — курируемый список

Не «загрузи любой файл» в MVP:

1. Лицензии  
2. Кириллица  
3. Синхрон client preview ↔ Remotion worker  
4. Случайный шрифт ломает переносы в layouts  

Пользователь выбирает **пару** (heading + body), не отдельные файлы:

```json
{ "fontPair": { "id": "modern_bold", "heading": "Unbounded", "body": "Inter" } }
```

### Кандидаты (OFL / Google Fonts, с кириллицей)

| Группа | Шрифты |
|--------|--------|
| Гротески | Inter, Golos Text, Manrope, Onest, Unbounded |
| Экранные | Bebas Neue (кир.), Russo One, Oswald |
| Serif | Playfair Display, Lora, PT Serif |
| Mono | JetBrains Mono |

Целевой каталог: **10–15 пар**.

### Тарифы на шрифты

| План | Шрифты |
|------|--------|
| Free | 3 пары |
| Pro | все пары + размер / межстрочный |
| Agency | upload `.ttf`/`.woff2` + чекбокс прав |

Upload своих шрифтов — v2–3 (валидация, кириллица, доставка в worker).

## Лимиты на темы (= число клиентов SMM)

| План | Темы |
|------|------|
| Free | 1 своя + пресеты |
| Pro | 5 тем |
| Agency | 20+ + клиентские шрифты + лого на слайдах |

См. [../business/models.md](../business/models.md).

## План внедрения (→ спринты)

| Итерация | Спринты | Scope |
|----------|---------|-------|
| MVP | 0–2 | 3 layout-bundle × 5 types; шрифты в токенах |
| 2 · подготовка | 3 | схема `layout×theme`, 6–8 цветовых пресетов, паттерны types в промптах |
| 2 · UI | 4 | picker 2 цвета, ~10 font pairs, `@handle`, Soft Pastel/Photo Overlay, quote/steps/…, progress_bars/big_percent |
| 3 · часть 1 | 5 | multi-theme + лимиты тарифов; types/styles по спросу |
| 3 · часть 2 | 6 | палитра из лого, лого на слайдах, bar_chart/timeline, анимация charts в MP4 |
| Позже | 11+ / Agency | upload шрифтов; палитра из URL; dark/light variant |

Детализация: [SPRINTS.md](../sprints/SPRINTS.md).

## Remotion reel templates (позже)

TalkingHeadReel, ExpertTipsReel, ProblemSolutionReel, CTAEndCard.

## Ассеты

`assets/fonts`, `stickers`, `music` (royalty-free!), `sfx`, `images`, `transitions`, `lottie`.
