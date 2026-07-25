# Slide rendering engine

Источник: brainstorm — «не генератор картинок, а движок слайдов».

## Формула

```
Карусель = набор слайдов
Слайд    = layout + content + assets + styles + effects
Рилс     = те же слайды + timing + transitions + audio
```

## Уровни

### 1. Theme / Style (примеры)

Minimal Black Yellow · Clean White Editorial · Gradient Neon · Luxury Beige · Startup Blue · Bold Red Black · Pastel Creator · Brutalist  

Токены: colors, fonts, radii, shadows, CTA, sticker style, chart style.

### 2. Carousel Template (структура)

| Шаблон | Слайды (пример) |
|--------|-----------------|
| Expert List | обложка → пункты → чеклист → CTA |
| Mistakes | 5 ошибок → как исправить → CTA |
| Problem Solution | проблема → почему → решение → пример → CTA |
| Myth / Truth | миф → правда → пример → вывод → CTA |
| Checklist | обложка → чеки → итог → CTA |
| Case Study | было → сделали → результат → повторить → CTA |
| Statistics Report | позже |
| Before After | позже |

**Старт бота:** 3 визуальных стиля — экспертный минимализм / яркий маркетинг / премиум-недвижимость.

### 3. Slide layouts (MVP 10–12)

**Базовые:** cover_center, text_only, text_big_number, text_with_badge, quote, checklist, cta  

**С картинками:** text_image_right/left, image_background_dark_overlay, image_top_text_bottom, image_bottom_text_top  

**Аналитика (позже):** stat_big_number, chart_bar/line/donut, before_after  

Чарты: свои SVG-компоненты (контроль стиля), не тяжёлый recharts на старте.

### 4. Elements

Text, Image, Sticker, Shape, Chart, Icon, Logo, Background, Badge, Arrow, ProgressBar  

Каждый: `x, y, width, height, zIndex` (+ rotation, opacity).  
Стикеры: drag/resize (react-rnd / dnd-kit) — управляемый редактор, не полный Canva.

### 5. Effects (заложить в JSON сразу)

fade, slide, scale, bounce, floating loop, pulse, typewriter, highlight…  

PNG игнорирует; MP4 читает.

## Редактор

**Гибрид:** React/HTML templates + drag для overlay-элементов.  
Не Canvas-Canva с нуля (сложнее синхронизировать с Remotion).

Mini App v1 (Sprint 4): текст, порядок слайдов, шаблон — **без** полного drag.

## Рилс из того же JSON

Поля `timing`, `audio`, `animation` карусель игнорирует.  
Один проект → две кнопки экспорта. Safe zones 9:16 заложить в layouts.  
Анимации **пресетами темы**, не keyframes. Ценность: «рилс без монтажа».

См. [video-carousels.md](./video-carousels.md), [../project/ARCHITECTURE.md](../project/ARCHITECTURE.md).
