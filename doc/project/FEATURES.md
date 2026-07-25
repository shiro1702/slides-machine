# Реестр фич

⬜ todo · 🔵 in_progress · ✅ done · ⏸️ paused · ❌ cancelled

---

## Sprint 0

| ID | Фича | Статус |
|----|------|--------|
| F0.1 | JSON-схема (+ timing/animation заложить) | ✅ |
| F0.2 | Next.js репо + Vercel | 🔵 |
| F0.3 | Neon: users, projects, jobs | ✅ |
| F0.4 | Vercel Blob smoke | ✅ |
| F0.5 | Telegram /start | ✅ |
| F0.6 | Форматы 1080² / 4:5 / 9:16 | ✅ |
| F0.7 | Meta: 5–7 шаблонов, 3 стиля, layouts enum | ✅ |

> F0.2: код и build готовы; production deploy / env на Vercel — после подключения секретов (см. README).
> F0.4/F0.5: API реализованы; live Blob/webhook smoke — после env.

## Этап 1 — PNG в TG (S1–3)

| ID | Фича | Статус |
|----|------|--------|
| F1.1 | Flow ниша → тема → стиль | ✅ |
| F1.2 | LLM → carousel JSON + Zod | ✅ |
| F1.3 | PNG render (Remotion `renderStill`, путь B) | ⬜ |
| F1.4 | Media group | ⬜ |
| F1.5 | Кнопки вариант/стиль/ZIP (ZIP из Blob) | ⬜ |
| F1.6 | Версии проекта | ⬜ |
| F1.7 | Аналитика воронки | 🔵 |
| F1.8 | Очередь jobs | 🔵 |

> F1.1/F1.2: код готов (fixture LLM + Groq path). Live TG/SMM — после env.
> F1.3: Strategy B — Remotion, не Playwright. Shared layouts без Next-магии.
> F1.7: structured telemetry events в stdout (без админки).
> F1.8: `render_carousel` job ставится в `queued`; worker — Sprint 2.

## Этап 2 — Mini App + client export (S4–5)

| ID | Фича | Статус |
|----|------|--------|
| F2.1 | Mini App / веб-редактор + signed link auth | ⬜ |
| F2.2 | Текст / порядок / add-delete slides | ⬜ |
| F2.3 | Смена шаблона | ⬜ |
| F2.4 | Re-export (server путь B из редактора) | ⬜ |
| F2.4a | Client ZIP html-to-image (путь A) | ⬜ |
| F2.4b | Upload фото → Blob (client) | ⬜ |
| F2.5 | История проектов | ⬜ |
| F2.6 | Лимиты free | ⬜ |
| F2.7 | Ref links | ⬜ |
| F2.8 | Админка min | ⬜ |

> Гибрид A/B: [RENDER.md](../dev/RENDER.md) · [editor-flow.md](../product/editor-flow.md).

## Этап 3 — MP4 из слайдов (S6)

| ID | Фича | Статус |
|----|------|--------|
| F3.1 | VPS worker (тот же, что PNG) | ⬜ |
| F3.2 | Remotion `renderMedia` → MP4 9:16 | ⬜ |
| F3.3 | Музыка v1 | ⬜ |
| F3.4 | Кнопка «Сделать рилс» | ⬜ |

## Этап 4 — видео-MVP (S7–10)

| ID | Фича | Статус |
|----|------|--------|
| F4.1 | Upload + ffprobe + proxy + poster | ⬜ |
| F4.2 | Video background + trim + duration auto | ⬜ |
| F4.3 | Transitions presets | ⬜ |
| F4.4 | Animation presets / темы | ⬜ |
| F4.5 | Audio tracks + ducking | ⬜ |

## Этап 5 — запуск (S11–12)

| ID | Фича | Статус |
|----|------|--------|
| F5.1 | Тарифы + watermark | ⬜ |
| F5.2 | ЮKassa (± Stars) | ⬜ |
| F5.3 | Мониторинг / стабильность | ⬜ |
| F5.4 | Лендинг | ⬜ |

## Позже

| ID | Фича | Статус |
|----|------|--------|
| F9.1 | Brand kits UI | ⬜ |
| F9.2 | Video → carousel (transcript) | ⬜ |
| F9.3 | Talking-head / edit.json | ⬜ |
| F9.4 | Messenger adapters (WA / VK / Max) — Core уже channel-agnostic | ⬜ |
| F9.4a | Миграция `user_identities` (подготовка S3–4) | ⬜ |
| F9.5 | React Native / Share Extension | ⬜ |
| F9.6 | Charts layouts | ⬜ |
| F9.7 | Drag stickers full editor | ⬜ |
| F9.8 | Agency / teams | ⬜ |
