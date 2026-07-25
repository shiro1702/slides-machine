# Спринты

**1 спринт ≈ 1 неделя** (соло: 1–2 нед). Текущий: **Sprint 0**.  
Продуктовые этапы: [ROADMAP.md](../roadmap/ROADMAP.md) · Фичи и статусы: [FEATURES.md](../project/FEATURES.md).

Sprint 0–3 детализированы как `sprint-N/README.md` + `tasks/`. Sprint 4–12 пока остаются укрупнённым планом и уточняются после прохождения продуктовых gates.

---

## Sprint 0 — архитектура и скелет *(сейчас)*

**Этап 0 · F0.1–F0.7.** JSON-схема и форматы · meta ниш/шаблонов/стилей · Next.js/Vercel · Neon users/projects/jobs · Blob smoke · Telegram `/start`.

**Юзеров не зовём.** → [план и критерии выхода](./sprint-0/README.md) · [задачи](./sprint-0/tasks/)

## Sprint 1 — бот: тема → структура JSON

**Этап 1 · F1.1–F1.2, основа F1.7/F1.8.** Flow `/start`/`/new` → ниша → тема → стиль · LLM → Zod · project + queued job · errors/telemetry.

**Тест:** внутренний, основатель + 2–3 SMM. → [план и критерии выхода](./sprint-1/README.md) · [задачи](./sprint-1/tasks/)

## Sprint 2 — PNG + media group

**Этап 1 · F1.3, F1.4, F1.8 и измерение F1.7.** Templates/layouts → server PNG render → queue → Blob → Telegram album.

**Закрытый тест №1:** 10–20 SMM, экспертов и риелторов. Метрика: time to first usable carousel **≤ 2–3 мин**.

Gate: **нужен ли результат?** Понятен ли бот, можно ли публиковать, что переписывают, хотят ли ещё?

→ [план и критерии выхода](./sprint-2/README.md) · [задачи](./sprint-2/tasks/)

## Sprint 3 — варианты, экспорт и качество

**Этап 1 · F1.5–F1.7.** `[Другой вариант] [Измени текст] [Другой стиль] [ZIP]` · immutable versions · prompt quality · воронка.

**Продолжение теста №1:** 3–5 проектов на человека; решение по gate перед Sprint 4. Полный «Редактировать» — в Mini App Sprint 4.

→ [план и критерии выхода](./sprint-3/README.md) · [задачи](./sprint-3/tasks/)

## Sprint 4 — Mini App v1

Текст, порядок, add/delete slide, стиль, re-export. Preview HTML ок.  
**Тест №2: 30–50**, 7 дней, ≥3 карусели.  

Цели: activation 40–60% до экспорта; 20–30% вторая карусель; 10–15% 3+.

## Sprint 5 — история, лимиты, админка

Проекты в Mini App · free limits · ref links · admin (Pro, jobs, ban).

## Sprint 6 — MP4 из слайдов (без user video)

1080×1920 · duration 2.5–4с · fade/slide/zoom · одна музыка · кнопка «Сделать рилс».  
**Тест №3: 50–100** + реальные деньги (500–990 ₽/мес early или пакет 199 ₽).

## Sprint 7 — video ingest

Presigned upload · ffprobe · H.264 CFR · proxy · poster · лимиты.  
Техтест 5–10 чел (iPhone/Android).

## Sprint 8 — video на слайдах, trim, duration auto

## Sprint 9 — transitions + animation presets (темы)

## Sprint 10 — audio tracks v1 (music/voiceover/sfx + ducking)

→ полноценный видео-MVP, 100–300.

## Sprint 11 — платежи, тарифы, watermark

## Sprint 12 — стабильность, мониторинг, публичный MVP

---

## Когда звать людей

| После | N | Вопрос |
|-------|---|--------|
| S2 | 10–20 | Нужен результат? |
| S4 | 30–50 | Сами без помощи? |
| S6 | 50–100 | Платят? |
| S9–10 | 100–300 | Экономика видео? |

## Не делать до первого теста

Сложный timeline, полный brand kit, команды, MAX, RN, 4K, keyframes.
