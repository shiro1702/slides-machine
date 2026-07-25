# Спринты

**1 спринт ≈ 1 неделя** (соло: 1–2 нед). Текущий: **Sprint 2**.  
Продуктовые этапы: [ROADMAP.md](../roadmap/ROADMAP.md) · Фичи и статусы: [FEATURES.md](../project/FEATURES.md).

Уточнение осей layout × theme × types / charts / Brand Kit: [brainstorm styles-themes](../brainstorms/25.07.2026-styles-themes-INDEX.md).

Sprint 0–3 детализированы как `sprint-N/README.md` + `tasks/`. Sprint 4–12 пока остаются укрупнённым планом и уточняются после прохождения продуктовых gates.

---

## Sprint 0 — архитектура и скелет *(код готов · deploy после env)*

**Этап 0 · F0.1–F0.7.** JSON-схема и форматы · meta ниш/шаблонов/стилей · Next.js/Remotion stub · Neon users/projects/jobs · Blob smoke API · Telegram `/start` handler.

**Юзеров не зовём.** → [план и критерии выхода](./sprint-0/README.md) · [задачи](./sprint-0/tasks/)

## Sprint 1 — бот: тема → структура JSON *(код готов · live после env)*

**Этап 1 · F1.1–F1.2, основа F1.7/F1.8.** Flow `/start`/`/new` → ниша → тема → стиль · LLM → Zod · project + queued job · errors/telemetry.

**Тест:** внутренний, основатель + 2–3 SMM. → [план и критерии выхода](./sprint-1/README.md) · [задачи](./sprint-1/tasks/)

## Sprint 2 — PNG + media group *(код готов · закрытый тест после deploy)*

**Этап 1 · F1.3, F1.4, F1.8 и измерение F1.7.** Templates/layouts → server PNG render → queue → Blob → Telegram album.

**MVP визуала (факт):** 3 bundle-стиля × ~5 базовых layouts (hook/text/numbered/checklist/cta). Полный Brand Kit и кастомные темы — не здесь.

**Закрытый тест №1:** 10–20 SMM, экспертов и риелторов. Метрика: time to first usable carousel **≤ 2–3 мин**.

Gate: **нужен ли результат?** Понятен ли бот, можно ли публиковать, что переписывают, хотят ли ещё? Какие стили выбирают чаще — сигнал для следующих layout/theme.

→ [план и критерии выхода](./sprint-2/README.md) · [задачи](./sprint-2/tasks/) · [test script](./sprint-2/test-script.md)

## Sprint 3 — варианты, экспорт и качество

**Этап 1 · F1.5–F1.7.** `[Другой вариант] [Измени текст] [Другой стиль] [ZIP]` · immutable versions · prompt quality · воронка.

**Дополнительно (подготовка осей, без Brand Kit UI):**

- В промптах зафиксировать паттерны types (`hook` → `numbered` × N → …) — [prompts.md](../product/prompts.md)
- Схему/токены держать готовыми к разделению `layoutId` × theme tokens (пресеты остаются UX-ярлыками)
- По данным теста решить: добавить ли в S4 типы `quote` / `big_number` / `steps` и layout Soft Pastel / Photo Overlay

**Продолжение теста №1:** 3–5 проектов на человека; решение по gate перед Sprint 4. Полный «Редактировать» — в Mini App Sprint 4.

→ [план и критерии выхода](./sprint-3/README.md) · [задачи](./sprint-3/tasks/)

## Sprint 4 — Mini App v1 + итерация тем/типов

Текст, порядок, add/delete slide, стиль, re-export. Preview HTML ок.

**Итерация 2 (визуал / бренд), если gate S2–3 ок:**

- Выбор пресетной Brand Theme + смена layout-стиля  
- Своя тема: 2 цвета (фон + акцент) → авто muted/surface/onAccent + проверка контраста (**F2.9**)  
- Font pair из курируемого списка (~10) (**F2.10**)  
- `@handle` в теме → авто в CTA  
- Типы/layouts: `quote`, `myth_fact`, `big_number`, `steps`  
- Charts: `progress_bars`, `big_percent` (**часть F9.6**)  
- Layout styles: + Soft Pastel, Photo Overlay (по данным выбора в тесте)

**Тест №2: 30–50**, 7 дней, ≥3 карусели.  

Цели: activation 40–60% до экспорта; 20–30% вторая карусель; 10–15% 3+.

## Sprint 5 — история, лимиты, админка + multi-theme

Проекты в Mini App · free limits · ref links · admin (Pro, jobs, ban).

**Итерация 3 (начало Brand Kit):**

- Несколько тем на пользователя («под клиентов») + лимиты Free/Pro (**F2.11**, см. [brand-kits.md](../product/brand-kits.md))  
- Тарифные лимиты на font pairs  
- Layout styles: Editorial / Corporate / Neon — по спросу  
- Типы: `before_after`, `question`, `author` (по спросу)

## Sprint 6 — MP4 из слайдов (без user video) + charts v2

1080×1920 · duration 2.5–4с · fade/slide/zoom · одна музыка · кнопка «Сделать рилс».  
Анимация charts (bars/donut 0→value) — дешёвый wow для рилса.

Дополнительно к Brand Kit: палитра из логотипа, лого на слайдах, `bar_chart` / `timeline` — если не уехало в S5.

**Тест №3: 50–100** + реальные деньги (500–990 ₽/мес early или пакет 199 ₽).

## Sprint 7 — video ingest

Presigned upload · ffprobe · H.264 CFR · proxy · poster · лимиты.  
Техтест 5–10 чел (iPhone/Android).

## Sprint 8 — video на слайдах, trim, duration auto

## Sprint 9 — transitions + animation presets (темы)

## Sprint 10 — audio tracks v1 (music/voiceover/sfx + ducking)

→ полноценный видео-MVP, 100–300.

## Sprint 11 — платежи, тарифы, watermark

Лимиты тем/шрифтов включаются в биллинг. Agency: upload шрифтов — backlog после стабильных оплат.

## Sprint 12 — стабильность, мониторинг, публичный MVP

---

## Когда звать людей

| После | N | Вопрос |
|-------|---|--------|
| S2 | 10–20 | Нужен результат? Какие стили берут? |
| S4 | 30–50 | Сами без помощи? Нужны свои цвета? |
| S6 | 50–100 | Платят? Тянут multi-theme? |
| S9–10 | 100–300 | Экономика видео? |

## Не делать до первого теста

Сложный timeline, полный Brand Kit UI, upload своих шрифтов, команды, MAX, RN, 4K, keyframes, Excel-charts.
