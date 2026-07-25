# Мессенджеры и боты

Источник: brainstorm 25.07 (TG-first) + [hybrid-render](../brainstorms/25.07.2026-hybrid-render-INDEX.md) (адаптеры, multi-channel).

## Стратегия

**Telegram-first** для MVP. Архитектура — **мульти-канальная с дня один**: бот = тонкий адаптер, Core = вся логика.  
WhatsApp / VK / Max — адаптеры позже, когда TG дал traction (не переписывать Core).

```
TG Adapter ──┐
WA Adapter ──┼──► Core Engine ──► Neon · Blob · Remotion · Web editor
VK / Max ────┘
```

Тест: «могу добавить мессенджер, не трогая Core?» → должно быть «да».

## Адаптер умеет ровно две вещи

1. **Inbound:** update канала → `InboundEvent`  
2. **Outbound:** ответ Core → API канала  

Никакой бизнес-логики (AI, тарифы, state machine) в адаптере.

### Универсальные типы (целевые)

```ts
type InboundEvent = {
  channel: "telegram" | "whatsapp" | "vk" | "max";
  channelUserId: string;
  chatId: string;
  type: "text" | "photo" | "voice" | "callback" | "command";
  text?: string;
  fileRef?: string;   // только до download; в Core уже наш Blob URL
  payload?: string;
};

type OutboundMessage = {
  type: "text" | "photos" | "video" | "document";
  text?: string;
  mediaUrls?: string[];
  buttons?: { id: string; label: string }[];
  link?: { url: string; label: string };
};
```

### Capabilities

Core выражает **намерение**, адаптер — UI:

```ts
{ intent: "choose", prompt: "Выберите стиль", options: [{ id, label }] }
```

| | Telegram | WhatsApp | VK | Max |
|--|----------|----------|-----|-----|
| Inline-кнопки | ✓ богатые | ~ до 3 | ✓ | ✓ |
| Альбом фото | ✓ до 10 | по одному | ✓ | ✓ |
| Mini App | ✓ | ✗ | ✓ Apps | ~ |
| Markdown | ✓ | урезан | ✗ | ~ |
| Signed link в редактор | ✓ | ✓ | ✓ | ✓ |

TG: media group. WA: цикл одиночных photos. Это решает **адаптер**.

## Identity

```
users (id, plan, …)                    -- продукт
user_identities (user_id, channel, channel_user_id)  -- UNIQUE(channel, channel_user_id)
```

Проекты, темы, подписка → `users.id`.  
Сейчас в схеме: `users.telegram_id` — ок для TG-only; миграция на identities **до** второго канала.  
Merge аккаунтов TG↔WA — не MVP.

## Dialog state machine (Core)

```
dialog_sessions (user_id, channel, state, context jsonb, updated_at)
(state, InboundEvent) → (newState, OutboundMessage[])
```

Один сценарий «тема → стиль → generate» для всех каналов. Юнит-тесты без мессенджеров.

## Файлы

Адаптер скачивает из канала → **сразу Blob Store** → в Core только наш URL.  
Core никогда не хранит `file_id` Telegram/WA.

## Доставка результата рендера

```
Worker done → Core (projectId, urls[])
  → смотрит channel сессии/job
  → OutboundMessage{ type: "photos", mediaUrls }
  → нужный адаптер
```

## Гибридный UX (Telegram)

### Чат (~ быстрый путь)

```
/new → тема → стиль → ⏳ → media group PNG   (путь B: Remotion)
[✏️ Редактировать] [🎬 Рилс] [🔄 Вариант]
```

### Веб / Mini App

Signed link или Mini App → редактор → ZIP (путь A) или «Отправить в чат» (путь B).  
См. [editor-flow.md](../product/editor-flow.md).

### /start

Коротко + примеры + `[Сделать карусель] [Примеры] [Как это работает]`.  
Трафик MVP → бот, не лендинг.

## Auth

| Способ | Канал |
|--------|--------|
| `initData` Mini App | Telegram |
| JWT `/e/{projectId}?t=…` | все каналы + десктоп |
| `?start=link_<token>` | привязка веб↔user |

Не строить веб только на Telegram Login Widget.

## Платежи в Telegram

Stars внутри TG + ЮKassa на сайте — витрины не смешивать. Учесть в экономике.

## WhatsApp / VK / Max — когда

| Канал | Зачем помнить | Когда кодить адаптер |
|-------|---------------|----------------------|
| WhatsApp | МБ, риелторы, салоны; ~$0.05–0.08/сессия; 24h window; верификация Meta недели | после traction TG |
| VK | РФ-бизнес, Mini Apps | по спросу |
| Max | гос/корп — следить | адаптер ~неделя, если архитектура чистая |

**MVP делает:** `user_identities` (или план миграции), интерфейсы Core, только `bot-telegram`.  
**MVP не делает:** WA/VK код, merge аккаунтов, конструктор диалогов.

## Лимиты Bot API (Telegram)

| Операция | Лимит |
|----------|--------|
| Скачать файл | 20 МБ |
| Отправить | 50 МБ |
| Self-hosted Bot API | до 2 ГБ |

Видео-upload → Mini App → storage напрямую; длинные MP4 — ссылка.

## Связанные

- [ARCHITECTURE.md](./ARCHITECTURE.md)  
- [RENDER.md](../dev/RENDER.md)  
- [../marketing/telegram/README.md](../marketing/telegram/README.md)
