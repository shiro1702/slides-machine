# Спринты

**1 спринт ≈ 1 неделя** (соло: 1–2 нед). Текущий: **Sprint 1** (код готов) → далее **Sprint 2**.  
Продукт: [ROADMAP.md](../roadmap/ROADMAP.md) · Фичи: [FEATURES.md](../project/FEATURES.md).  
Рендер/каналы: [hybrid-render brainstorm](../brainstorms/25.07.2026-hybrid-render-INDEX.md) · [RENDER.md](../dev/RENDER.md).

Sprint 0–3 детализированы (`sprint-N/`). Sprint 4+ — план + уточнения ниже.

---

## Карта гибридного рендера → спринты

| Путь | Что | Спринт |
|------|-----|--------|
| Shared slides | чистый React, Remotion-compatible | **2** (дисциплина с task 01) |
| **B** server | Remotion `renderStill` → Blob → TG album | **2** |
| ZIP из Blob PNG | скачать готовые серверные PNG | **3** |
| Редактор + auth | `/e/{id}` · Mini App · signed JWT | **4** |
| **A** client | html-to-image → ZIP (± watermark позже) | **4** |
| Фото в вебе | Blob client upload | **4** |
| Free/Pro split | watermark / server priority | **5 / 11** |
| **C** reels | Remotion `renderMedia` | **6** |
| `user_identities` | миграция с `telegram_id` | **3–4** (схема), адаптеры WA/VK — **после traction** |

Черновик «S1=editor, S2=Remotion» из брейншторма **смаплен** на нашу нумерацию: JSON уже в S1; server album = наш S2; client ZIP = наш S4.

---

## Sprint 0 — архитектура и скелет *(код готов · deploy после env)*

JSON-схема · meta · Next/Remotion stub · Neon users/projects/jobs · Blob · TG `/start`.

→ [план](./sprint-0/README.md) · [задачи](./sprint-0/tasks/)

## Sprint 1 — бот: тема → JSON *(код готов · live после env)*

Flow ниша → тема → стиль · LLM → Zod · queued job.

→ [план](./sprint-1/README.md) · [задачи](./sprint-1/tasks/)

## Sprint 2 — Remotion PNG + media group *(путь B)*

**Этап 1 · F1.3, F1.4, F1.8 · F1.7.**

- Layouts как **чистый React** (без `next/image` / fetch) — пригодны и для html-to-image позже  
- Server: **Remotion `renderStill`** (Strategy B), не Playwright  
- Queue → Blob → Telegram `sendMediaGroup`  
- Закрытый тест №1: 10–20 чел, usable ≤ 2–3 мин  

Gate: нужен ли результат?

→ [план](./sprint-2/README.md) · [задачи](./sprint-2/tasks/)

## Sprint 3 — варианты, ZIP, подготовка multi-channel

**F1.5–F1.7.**

- Кнопки вариант / текст / стиль · versions · ZIP из **уже отрендеренных** PNG  
- Промпты + воронка  
- **Схема:** план/миграция `users` → `user_identities` (TG как первый channel); статусы проекта `draft|generated|…`  
- Ссылка «Редактировать» может вести в waitlist **или** signed stub — полный editor в S4  

→ [план](./sprint-3/README.md) · [задачи](./sprint-3/tasks/)

## Sprint 4 — Mini App / веб-редактор + путь A

Текст, порядок, add/delete, стиль, re-export.

**Гибрид (из брейншторма):**

- Preview на shared slides  
- **Путь A:** html-to-image + JSZip (шрифты, CORS, iOS-тесты)  
- Кнопка «Отправить в Telegram» → путь B (существующий worker)  
- Upload фото → Blob client upload  
- Auth: Mini App `initData` + signed link `/e/{id}?t=`  

**Тест №2: 30–50**, 7 дней.  
Вопрос: сами без помощи? Хватает ZIP или нужен альбом в чат?

→ детали в [editor-flow.md](../product/editor-flow.md); tasks завести при старте спринта.

## Sprint 5 — история, лимиты, админка

Проекты · free limits · ref · admin.  
Watermark на client ZIP (Free); Pro — server deliver без watermark / приоритет очереди.

## Sprint 6 — MP4 (путь C)

`renderMedia` 9:16 · fade/slide/zoom · музыка · «Сделать рилс».  
Тот же worker/composition, что PNG.

**Тест №3: 50–100** + early pay.

## Sprint 7 — video ingest

## Sprint 8 — video на слайдах, trim, duration auto

## Sprint 9 — transitions + animation presets

## Sprint 10 — audio tracks v1

## Sprint 11 — платежи, тарифы, watermark (закрепить Free A / Pro B)

## Sprint 12 — стабильность, мониторинг, публичный MVP

---

## Когда звать людей

| После | N | Вопрос |
|-------|---|--------|
| S2 | 10–20 | Нужен результат (альбом)? |
| S4 | 30–50 | Сами в редакторе? ZIP vs «в Telegram»? |
| S6 | 50–100 | Платят за рилсы/сервер? |
| S9–10 | 100–300 | Экономика видео? |

## Не делать до первого теста (S2)

Второй мессенджер, Playwright-пайплайн «на время», полный Brand Kit, client MP4, merge аккаунтов, WA-оплата диалогов.
