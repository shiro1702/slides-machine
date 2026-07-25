# Архитектура

> Вынесено из brainstorm 25.07.2026. Ядро: **slide rendering engine** на едином JSON.

## Принцип

```
Один project JSON
  → PNG-карусель
  → animated MP4
  → рилс / сторис / реклама
```

Рилс = карусель, развёрнутая во времени (слайд → сцена, свайп → переход).

Клиенты — тонкие; тяжёлое на сервере:

```
                    ┌──────────────────────────────┐
                    │  CORE                        │
                    │  API · AI · schema · queue   │
                    │  Remotion · storage          │
                    └──────┬───────┬───────┬───────┘
                           │       │       │
                    ┌──────┴──┐ ┌──┴────┐ ┌┴────────┐
                    │ Web-app │ │ TG-бот │ │ MAX     │
                    │ (Next)  │ │+MiniApp│ │ (позже) │
                    └─────────┘ └────────┘ └─────────┘
```

## Слои данных

Три независимые оси визуала/контента (уточнение [styles-themes brainstorm](../brainstorms/25.07.2026-styles-themes-INDEX.md)):

```
Layout Style × Brand Theme × Slide type
```

| Слой | Что |
|------|-----|
| Layout Style | характер вёрстки, декор, radius, textCase (Minimal, Bold, …) |
| Brand Theme | цвета, font pair, лого, @handle (пресеты → кастом) |
| Carousel Template | Expert List, Mistakes, Checklist… (паттерн последовательности) |
| Slide type / Layout | hook, numbered, checklist, cta… → cover_center, chart_bars… |
| Elements | text, image, sticker, chart, shape, logo… |
| Effects | in/out/loop (в JSON сразу; на MVP PNG игнор) |
| Timing / Audio | duration, transition, music/voiceover/sfx (рилс) |

Пока в коде Sprint 0–2 `themeId` ещё bundle (layout+цвета+шрифты). Целевая схема: отдельные `layoutId` + theme tokens / `themeId`, без ломки существующих preset id.

Схема должна быть **независима от Remotion** → позже edit.json → DaVinci/Premiere XML.

## Сущности БД (минимум)

| Entity | Поля (кратко) |
|--------|----------------|
| User | telegram_id / email, plan, createdAt |
| Project | userId, type: carousel \| video_carousel \| reel, title, status |
| BrandKit | userId, colors, fonts, logoUrl (позже) |
| Template | meta шаблонов |
| Scene / slides JSON | внутри project или отдельная таблица |
| Asset | url, type, ffprobe meta, proxyUrl, posterUrl |
| Export | type png_zip \| mp4, url |
| RenderJob | status, error, attempts |
| ProjectVersion | варианты генерации |

## Монорепо (целевая структура)

```
apps/
  web/          # Next.js — кабинет, Mini App, API, webhook
  worker/       # Remotion, FFmpeg, transcribe
packages/
  schemas/      # Zod: project, carousel, reel, brand
  templates/    # React slide + reel compositions
  ai/           # prompts
  brand/        # default themes
```

На Sprint 0 достаточно одного Next.js app; packages выделить, когда появятся worker и повторное использование.

## Пайплайны

### Тема → карусель

```
тема → LLM → carousel.json → Zod → render PNG → Blob → TG media group
```

### Карусель → рилс (без user video)

```
тот же JSON + timing/animation → Remotion worker → MP4 → TG
```

### Видео на слайдах (позже)

```
upload → ffprobe → H.264 CFR → proxy 720p → poster → S3
scene.background = video + trim + duration auto
```

### Talking-head Reels (ещё позже)

```
script.md → edit.json → локальный агент / cloud worker → Remotion
```

Не блокирует MVP каруселей.

## Что не делать в ядре

- Полноценный CapCut-таймлайн
- Client-side MP4 как основной путь (см. [../dev/RENDER.md](../dev/RENDER.md))
- MCP как центр SaaS (обычный REST/API; MCP — опция для power users)
- Nuxt вместо Next — Remotion только React (см. PROJECT.md)

## Связанные документы

- **Каноническая JSON-схема (Zod):** [`lib/schemas`](../../lib/schemas/) — `project`, scenes, elements, format→размеры, timing/animation/audio
- [../product/slide-engine.md](../product/slide-engine.md)
- [../product/layout-styles.md](../product/layout-styles.md) · [../product/slide-types.md](../product/slide-types.md) · [../product/brand-kits.md](../product/brand-kits.md)
- [../dev/DEPLOY.md](../dev/DEPLOY.md)
- [../dev/RENDER.md](../dev/RENDER.md)
- [BOT_MESSENGERS.md](./BOT_MESSENGERS.md)
