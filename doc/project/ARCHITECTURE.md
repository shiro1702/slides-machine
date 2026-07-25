# Архитектура

> Ядро: **slide rendering engine** на едином JSON.  
> Уточнения: [hybrid-render](../brainstorms/25.07.2026-hybrid-render-INDEX.md) (клиент+Remotion, мульти-каналы).

## Принцип

```
Один project JSON
  → PNG (клиент html-to-image ИЛИ Remotion renderStill)
  → animated MP4 (Remotion renderMedia)
  → рилс / сторис / реклама
```

Рилс = карусель во времени. **Один пакет слайдов** для web / client export / Remotion.

```
        ┌────────────┐ ┌────────────┐ ┌────────────┐
        │ TG Adapter │ │ WA (позже) │ │ VK / Max   │  ← тонкие
        └──────┬─────┘ └──────┬─────┘ └──────┬─────┘
               └──────────────┼──────────────┘
                              ▼
               ┌──────────────────────────────┐
               │  CORE                        │
               │  dialogs · AI · projects     │
               │  themes · tariffs · jobs     │
               └──────┬───────┬───────┬───────┘
                      │       │       │
               ┌──────┴──┐ ┌──┴────┐ ┌┴────────┐
               │ Web     │ │Remotion│ │ Neon    │
               │ editor  │ │ worker │ │ Blob    │
               └─────────┘ └────────┘ └─────────┘
```

Тест чистоты кода: «знает про Telegram?» → только adapter; «про слайды/тарифы?» → core; «и то и то?» → разрезать.

## Слои данных (контент)

| Слой | Что |
|------|-----|
| Theme / Style | цвета, шрифты, радиусы, CTA… |
| Carousel Template | Expert List, Mistakes, Checklist… |
| Slide Layout / type | cover_center, checklist, chart_bars… |
| Elements | text, image, sticker, chart, logo… |
| Effects | in/out/loop (PNG игнор; MP4 читает) |
| Timing / Audio | duration, transition, music… (рилс) |

Схема **независима от Remotion** → позже edit.json / XML.

## Сущности БД (минимум)

| Entity | Поля (кратко) |
|--------|----------------|
| **User** | uuid, plan, createdAt — **канало-независимый** |
| **UserIdentity** | userId, channel (`telegram`\|`whatsapp`\|…), channelUserId · UNIQUE(channel, channel_user_id) |
| Project | userId, type, title, status, JSON |
| BrandKit | userId, colors, fonts, logoUrl (позже) |
| Template | meta |
| Asset | url, type, ffprobe, proxy, poster |
| Export | type client_zip \| png_album \| mp4, url |
| RenderJob | status, result_urls[], attempts, error |
| ProjectVersion | варианты генерации |
| DialogSession | userId, channel, state, context jsonb |

Сейчас в коде Sprint 0: `users.telegram_id` напрямую. **Миграция к `user_identities`** — заложить до второго канала (желательно Sprint 3–4), иначе болезненно. Слияние аккаунтов между каналами — не MVP.

## Монорепо (целевая)

```
apps/
  web/              # Next.js: редактор, API, Mini App host
  remotion/         # compositions, renderStill/Media entry
  bot-telegram/     # тонкий адаптер (можно пока routes в web)
  bot-whatsapp/     # позже
  worker/           # poll jobs → Remotion → Blob → notify Core
packages/
  slides/           # 🔥 чистый React: компоненты + tokens + renderSlide
  core/             # state machine, Inbound/Outbound, проекты, тарифы
  schemas/          # Zod
  db/               # Drizzle schema + migrations
  ai/               # prompts
```

На Sprint 0–2 допустим один Next.js app + `remotion/` + `lib/`; вынос `packages/slides` и `packages/core` — дисциплина границ важнее папок. Компоненты слайдов уже сейчас без `next/image` / fetch.

## Пайплайны

### Тема → JSON (все каналы)

```
InboundEvent → Core dialog → LLM → Zod project JSON → Neon
```

### Экспорт A — клиент

```
Web editor → html-to-image → ZIP → событие exported
```

### Экспорт B — сервер → мессенджер

```
job queued → Remotion renderStill × N → Blob
  → Core OutboundMessage{photos} → adapter → album
```

### Карусель → рилс

```
тот же JSON + timing → Remotion renderMedia → MP4 → adapter
```

### Видео на слайдах / talking-head

См. [video-ingest](../product/video-ingest.md), [reels-automation](../product/reels-automation.md) — не блокируют PNG MVP.

## Что не делать в ядре

- Логику тарифов/AI внутри Telegram handlers  
- Второй серверный движок вёрстки (Playwright «на время»)  
- Client-side MP4 как основной путь  
- MCP как центр SaaS  
- Nuxt вместо Next  

## Связанные документы

- Zod: [`lib/schemas`](../../lib/schemas/)  
- [RENDER.md](../dev/RENDER.md) · [editor-flow.md](../product/editor-flow.md)  
- [BOT_MESSENGERS.md](./BOT_MESSENGERS.md) · [DEPLOY.md](../dev/DEPLOY.md)  
- [slide-engine.md](../product/slide-engine.md)
