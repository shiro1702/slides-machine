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
| F1.3 | PNG render | ✅ |
| F1.4 | Media group | ✅ |
| F1.5 | Кнопки вариант/стиль/ZIP | ⬜ |
| F1.6 | Версии проекта | ⬜ |
| F1.7 | Аналитика воронки | 🔵 |
| F1.8 | Очередь jobs | ✅ |

> F1.1/F1.2: код готов (fixture LLM + Groq path). Live TG/SMM — после env.
> F1.3/F1.4/F1.8: worker → Remotion/layout PNG → Blob → `sendMediaGroup` (Sprint 2).
> F1.7: structured telemetry через generation/render/delivery; закрытый тест — [test-script.md](../sprints/sprint-2/test-script.md).

## Этап 2 — Mini App + Brand Theme (S4–5)

| ID | Фича | Статус | Спринт |
|----|------|--------|--------|
| F2.1 | Mini App редактор v1 | ⬜ | 4 |
| F2.2 | Текст / порядок / add-delete slides | ⬜ | 4 |
| F2.3 | Смена layout-стиля / theme | ⬜ | 4 |
| F2.4 | Re-export | ⬜ | 4 |
| F2.5 | История проектов | ⬜ | 5 |
| F2.6 | Лимиты free (генерации/экспорт) | ⬜ | 5 |
| F2.7 | Ref links | ⬜ | 5 |
| F2.8 | Админка min | ⬜ | 5 |
| F2.9 | Своя Brand Theme: 2 цвета + авто-токены + контраст | ⬜ | 4 (схема в 3) |
| F2.10 | Font pair из курируемого списка + `@handle` | ⬜ | 4 |
| F2.11 | Несколько тем на пользователя + лимиты тарифов | ⬜ | 5 |
| F2.12 | Расширение slide types (+ layout Soft Pastel / Photo Overlay) | ⬜ | 4; v3 в 5 |

> Итерации styles-themes: [SPRINTS.md](../sprints/SPRINTS.md#карта-брейншторма--спринты).

## Этап 3 — MP4 из слайдов (S6)

| ID | Фича | Статус |
|----|------|--------|
| F3.1 | VPS worker | ⬜ |
| F3.2 | Animated → MP4 9:16 | ⬜ |
| F3.3 | Музыка v1 | ⬜ |
| F3.4 | Кнопка «Сделать рилс» | ⬜ |

> В S6 также: анимация charts, `bar_chart`/`timeline`, палитра из лого (части F9.1 / F9.6).

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
| F9.1 | Brand kits UI (лого, палитра из лого → S6; из URL / dark variant — позже) | ⬜ |
| F9.2 | Video → carousel (transcript) | ⬜ |
| F9.3 | Talking-head / edit.json | ⬜ |
| F9.4 | MAX adapter | ⬜ |
| F9.5 | React Native / Share Extension | ⬜ |
| F9.6 | Charts: progress_bars/big_percent → **S4**; bar/timeline → **S6**; pie позже | ⬜ |
| F9.7 | Drag stickers full editor | ⬜ |
| F9.8 | Agency / teams | ⬜ |
| F9.9 | Upload своих шрифтов (Agency, после S11) | ⬜ |
