# Sprint 2 — Remotion PNG + media group (путь B)

**Статус:** запланирован · **Тест:** закрытый №1, 10–20 пользователей  
**Рендер:** серверный **Remotion `renderStill`** → Blob → TG album · [RENDER.md](../../dev/RENDER.md)

## Цель

Замкнуть цикл: тема → JSON → **одинаковые** PNG → Telegram album. Проверить спрос на результат.

**Roadmap:** [этап 1](../../roadmap/ROADMAP.md#1--png-в-telegram) · **Фичи:** F1.3, F1.4, F1.8, измерение F1.7

## Зависимости

- Sprint 1: валидный project JSON + queued `render_carousel`.
- Blob; meta layouts = Zod.

## Чеклист

- [ ] Templates/layouts = **чистый React** (props-only; без `next/image`, `next/font`, fetch) — общий код для будущего html-to-image ([task 01](./tasks/01-slide-templates.md))
- [ ] F1.3 — Remotion `renderStill` (или совместимый Remotion path) воспроизводимо даёт PNG ([task 02](./tasks/02-png-render.md))
- [ ] F1.8 — job lifecycle → Blob ([task 03](./tasks/03-render-queue-storage.md))
- [ ] F1.4 — `sendMediaGroup` в порядке ([task 04](./tasks/04-telegram-media-group.md))
- [ ] Закрытый тест ([task 05](./tasks/05-closed-test.md))

## Архитектурные правила спринта

- **Strategy B:** не вводим Playwright/Satori как второй движок вёрстки.  
- Шрифты — из репо/пакета, одинаково для Remotion.  
- Логика «что рендерить» в Core/shared; TG handler только отправляет.

## Критерии выхода

- [ ] Album без ручных действий команды
- [ ] Один JSON → визуально те же PNG
- [ ] Ошибка job не блокирует очередь; retry не дублирует album
- [ ] p50 time-to-usable и доля ≤3 мин измерены
- [ ] Feedback: публикуют? что переписывают?

## Gate

**Нужен ли результат?** Публикация + возврат за второй каруселью.

## Не входит

Клиентский html-to-image (S4), ZIP UI (S3), Mini App editor, MP4, второй мессенджер, Playwright.

## Ретро

_(метрики · continue/change/stop · долг packages/slides)_
