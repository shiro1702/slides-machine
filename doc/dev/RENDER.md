# Рендер: клиент + сервер (гибрид)

Источник: brainstorm [hybrid-render](../brainstorms/25.07.2026-hybrid-render-INDEX.md) + 25.07.2026.

## Главный принцип

**Один набор React-компонентов слайдов** → три пути вывода.  
Два разных рендера (веб «красиво», бот «чуть иначе») — запрещённая ошибка.

```
                  ┌─ A. Браузер: html-to-image → ZIP
Project JSON ─────┼─ B. Worker: Remotion renderStill → PNG → мессенджер
                  └─ C. Worker: Remotion renderMedia → MP4 (рилсы)
```

Все пути едят shared slide components (чистый React, props-only).

## Пути экспорта

| Путь | Где | Когда | Тариф |
|------|-----|-------|-------|
| **A** | Клиент: `html-to-image` + JSZip | Редактор «Скачать ZIP» | Free (± watermark) |
| **B** | Сервер: Remotion `renderStill` | Бот без редактора / «Отправить в Telegram» | Pro / удобство |
| **C** | Сервер: Remotion `renderMedia` | Рилсы | Pro+ |

Клиентский MP4 (MediaRecorder / ffmpeg.wasm) — **не** основной путь (iOS, кодеки, память).

## Shared components (`@slides`)

```
packages/slides/          # или remotion/layouts → выделить пакет
  components/             # HookSlide, NumberedSlide, …
  themes/tokens.ts
  renderSlide.tsx         # type + data + theme + size → JSX
```

**Нельзя в shared:** `next/image`, `next/font`, fetch внутри компонента, Next-only CSS.  
**Можно:** чистые FC, inline styles / токены, SVG, обычный `<img>`.  
Шрифты — **файлы из пакета** (`staticFile` / `@font-face`), не CDN (иначе A≠B).

Обёртки:

- `apps/web` — preview + html-to-image  
- `apps/remotion` (или `remotion/`) — `<Composition>` + `renderStill` / `renderMedia`

## Путь A — клиентский ZIP

1. Слайды в DOM 1080×1350 (на экране `transform: scale`)  
2. `await document.fonts.ready`  
3. Последовательно `toPng` + прогресс («3 из 7») — не `Promise.all` на мобилках  
4. JSZip → `saveAs`

### Подводные камни

| Риск | Митигация |
|------|-----------|
| Шрифты | только после `fonts.ready` |
| CORS / tainted canvas | Blob Store с `Access-Control-Allow-Origin` |
| Скрытые слайды | offscreen (`left: -9999`), не `display: none` |
| Safari/iOS | двойной `toPng` (прогрев); тест на iPhone обязателен |
| Память | последовательный рендер |
| Эмодзи | системные ок для MVP; позже Twemoji |

**Плюсы:** ~$0/карусель, WYSIWYG, без очереди, не жрёт Vercel CPU.

## Путь B — сервер Remotion (Strategy B)

Remotion = headless Chromium: `renderStill` → PNG, `renderMedia` → MP4.  
**Playwright / Satori как основной серверный путь — не берём** (второй движок вёрстки → расхождения; Playwright всё равно выкинем перед рилсами).

```
INSERT render_jobs → worker poll
  → renderStill × N
  → Blob URLs
  → Core → messenger adapter → album / photos
```

Worker: Railway / Fly / VPS $5–10 (не Vercel Functions).  
Карусель ~7 слайдов ≈ 5–15 с — ок для чата («Генерирую…»).

Лицензия Remotion: бесплатно для ≤3 человек; company license заложить в экономику.

## Путь C — рилсы

Тот же composition + timing/animation → `renderMedia`.  
Инфра та же, что у B. При очереди → `@remotion/lambda` / Cloud Run.

## Preview в редакторе

Remotion Player / HTML preview тех же компонентов — **да**.  
Финальный PNG/MP4 на слабом iPhone через клиент — только путь A с прогрессом; иначе путь B.

## Очередь (путь B/C)

```
generate_content → (optional) render_carousel → deliver_to_channel
```

Webhook мессенджера не ждёт рендер. JSON в Neon — источник правды; PNG/MP4 — артефакты.

## Маппинг на спринты

| Что | Спринт |
|-----|--------|
| Shared pure React slides + signed editor + путь A (html-to-image ZIP) | **1** |
| Shared layouts + путь B (Remotion album) | **2** |
| ZIP из уже готовых PNG (бот, Blob) | **3** |
| Brand Theme UI + Mini App initData + types/charts; «в Telegram» → B из editor | **4** |
| Watermark Free / Pro server | **5 / 11** |
| Путь C MP4 | **6** |

> Фундамент бот→JSON: [sprint-1-bot-json](../sprints/sprint-1-bot-json/README.md).  
> Маппинг = скорректированный hybrid-план (S1 = editor+A, S2 = Remotion B).

См. [editor-flow.md](../product/editor-flow.md) · [DEPLOY.md](./DEPLOY.md) · [SPRINTS.md](../sprints/SPRINTS.md).
