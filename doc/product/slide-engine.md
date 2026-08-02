# Slide rendering engine

Источник: brainstorm 25.07 + уточнение осей в [styles-themes](../brainstorms/25.07.2026-styles-themes-INDEX.md) + атомы/варианты в [02.08 INDEX](../brainstorms/02.08.2026-INDEX.md).

## Формула

```
Карусель = набор слайдов
Слайд    = slide type + variant + content + assets
           × layout style (характер вёрстки + atom variants + chrome)
           × brand theme (цвета, шрифты, лого, handle)
Рилс     = те же слайды + timing + transitions + audio
```

Три независимые оси → комбинаторика без взрыва кода:

```
Layout Style  ×  Brand Theme  ×  Slide type (+ variant A/B/C)
   ~8 стилей      ∞ юзерских     ~14 типов + charts
```

Внутри вёрстки — ещё три слоя реализации: **tokens → atoms → templates** ([atoms.md](./atoms.md)).

Каталоги: [layout-styles.md](./layout-styles.md) · [brand-kits.md](./brand-kits.md) · [slide-types.md](./slide-types.md) · [charts.md](./charts.md) · [atoms.md](./atoms.md).

## Уровни

### 1. Layout Style (характер)

Clean Minimal · Dark Premium · Bold Marketing · Soft Pastel · Editorial · Corporate · Photo Overlay · Neon Tech  

Хранит: decor, radius, textCase, padding/spacing, safe areas.  
**Не** жёстко цвета клиента — они в Brand Theme.

### 2. Brand Theme (бренд)

Токены: `background`, `surface`, `text`, `textMuted`, `accent`, `onAccent` + `fontPair` + logo + `@handle`.  

MVP: пресеты. Дальше: picker → из лого → из URL. См. [brand-kits.md](./brand-kits.md).

> **Сейчас в коде** `themeId` / `styles.ts` ещё объединяет layout+цвета+шрифты (3 bundle). Целевое разрезание — без ломки id для тестеров Sprint 2.

### 3. Carousel Template (паттерн структуры)

| Шаблон | Слайды (пример) |
|--------|-----------------|
| Expert List / Ошибки | hook → numbered × N → checklist → cta |
| Mistakes | hook → numbered × N → big_number → checklist → cta |
| Problem Solution | problem → why → solution → example → cta |
| Myth / Truth | hook → myth_fact × N → text → cta |
| Checklist | hook → checklist → summary → cta |
| Case Study | hook → before_after → steps × 3 → author → cta |
| Statistics / Charts | позже |
| Before After | позже как тип; template уже в meta |

**Старт бота:** 3 визуальных bundle-стиля — экспертный минимализм / яркий маркетинг / премиум-недвижимость.

### 4. Slide types / layouts

**MVP (5):** `hook`, `text`, `numbered`, `checklist`, `cta`  

**S3–4 (+):** `quote`, `myth_fact`, `big_number`, `steps` + `progress_bars`, `big_percent`  

**S5+:** `before_after`, `question`, `photo`, `comparison`, `author` + `bar_chart`, `timeline`  

В Zod/Remotion сейчас layout ids: `cover_center`, `text_only`, `text_big_number`, `text_with_badge`, `quote`, `checklist`, `cta`, image-*. Семантические `type` мапятся на эти компоненты.

Чарты: свои SVG ([charts.md](./charts.md)), не тяжёлый recharts на старте.

### 5. Elements → атомы + overlays

Базовая служебка слайда — **атомы** (`SlideCounter`, `AuthorBadge`, `Label`, …) внутри `SlideFrame`. См. [atoms.md](./atoms.md).

Опциональные overlays редактора: Image, Sticker, Shape, Chart, Icon, Logo, Badge, Arrow…  

Каждый overlay: `x, y, width, height, zIndex` (+ rotation, opacity).  
Стикеры: drag/resize (react-rnd / dnd-kit) — управляемый редактор, не полный Canva.

### 6. Effects (заложить в JSON сразу)

fade, slide, scale, bounce, floating loop, pulse, typewriter, highlight…  

PNG игнорирует; MP4 читает. Charts в рилсе: анимация роста bars/donut.

## Редактор

**Гибрид:** React/HTML templates + drag для overlay-элементов.  
Не Canvas-Canva с нуля (сложнее синхронизировать с Remotion).

Mini App v1 (Sprint 4): текст, порядок слайдов, стиль/тема — **без** полного drag.

## Рилс из того же JSON

Поля `timing`, `audio`, `animation` карусель игнорирует.  
Один проект → две кнопки экспорта. Safe zones 9:16 заложить в layouts.  
Анимации **пресетами темы**, не keyframes. Ценность: «рилс без монтажа».

См. [video-carousels.md](./video-carousels.md), [../project/ARCHITECTURE.md](../project/ARCHITECTURE.md).
