# Спринты

**1 спринт ≈ 1 неделя** (соло: 1–2 нед). Текущий: **Sprint 2**.  
Продуктовые этапы: [ROADMAP.md](../roadmap/ROADMAP.md) · Фичи: [FEATURES.md](../project/FEATURES.md).  
Оси визуала: [styles-themes brainstorm](../brainstorms/25.07.2026-styles-themes-INDEX.md) · [slide-engine](../product/slide-engine.md).

Sprint 0–6 детализированы как `sprint-N/README.md` (+ `tasks/` где есть). Sprint 7–12 — укрупнённый план.

---

## Карта брейншторма → спринты

| Итерация | Спринты | Layout styles | Slide types | Brand Theme / fonts | Charts |
|----------|---------|---------------|-------------|---------------------|--------|
| **MVP** | 0–2 | 3 (Clean Minimal / Dark Premium / Bold ≈ текущие bundles) | 5: hook, text, numbered, checklist, cta | 3 font pairs в токенах; цветовые пресеты пока = 3 bundle | — |
| **Итерация 2** | 3–4 | + Soft Pastel, Photo Overlay | + quote, myth_fact, big_number, steps | S3: схема `layout×theme` + 6–8 цветовых пресетов; S4: picker 2 цвета, ~10 font pairs, `@handle` | progress_bars, big_percent |
| **Итерация 3** | 5–6 | + Editorial, Corporate, Neon (по спросу) | + before_after, question, photo, comparison, author | multi-theme, лимиты тарифов; палитра из лого, лого на слайдах | bar_chart, timeline (+ анимация в MP4) |
| **Позже** | 11+ / Agency | — | pie и др. | upload шрифтов, палитра из URL, dark/light variant | pie |

```
Layout Style  ×  Brand Theme  ×  Slide type
```

---

## Sprint 0 — архитектура и скелет *(код готов · deploy после env)*

**Этап 0 · F0.1–F0.7.** JSON-схема · meta ниш/шаблонов/стилей · Next.js/Remotion stub · Neon · Blob smoke · TG `/start`.

→ [план](./sprint-0/README.md) · [задачи](./sprint-0/tasks/)

## Sprint 1 — бот: тема → структура JSON *(код готов · live после env)*

**Этап 1 · F1.1–F1.2.** Flow ниша → тема → стиль · LLM → Zod · project + queued job.

→ [план](./sprint-1/README.md) · [задачи](./sprint-1/tasks/)

## Sprint 2 — PNG + media group *(код готов · закрытый тест после deploy)* — **MVP визуала**

**Этап 1 · F1.3, F1.4, F1.8 · измерение F1.7.**

| Ось | Объём MVP (факт) |
|-----|------------------|
| Layout / style bundles | 3: `expert_minimal`, `bright_marketing`, `premium_realestate` |
| Slide types / layouts | ~5: cover/hook, text, numbered/big number, checklist, cta |
| Brand Theme | нет отдельного слоя; цвета+шрифты внутри bundle |
| Charts | нет |

**Закрытый тест №1:** 10–20 чел. Usable carousel ≤ 2–3 мин.  
Gate: нужен ли результат? **Какие стили выбирают?** → вход в S3–4.

→ [план](./sprint-2/README.md) · [задачи](./sprint-2/tasks/) · [test script](./sprint-2/test-script.md)

## Sprint 3 — варианты + старт итерации 2 (схема и пресеты)

**Этап 1 · F1.5–F1.7** + подготовка Brand Theme.

1. Кнопки `[Другой вариант] [Измени текст] [Другой стиль] [ZIP]` · versions · воронка  
2. Промпт-паттерны types (`hook` → `numbered` × N → …)  
3. **Схема:** разделить `layoutId` × theme tokens (без UI picker)  
4. **6–8 цветовых пресетов** поверх 3 layout-стилей (закрыть gap MVP)  
5. По данным S2 — приоритет для Soft Pastel / Photo Overlay и types `quote` / `big_number` / `steps` в S4  

**Не входит:** Mini App, color picker UI, charts render, upload шрифтов.

→ [план](./sprint-3/README.md) · [задачи](./sprint-3/tasks/)

## Sprint 4 — Mini App v1 + итерация 2 (UI)

**Этап 2 · F2.1–F2.4, F2.9, F2.10, F2.12 · часть F9.6.**

| Блок | Scope |
|------|--------|
| Редактор | текст, порядок, add/delete, re-export, HTML preview |
| Layout styles | + Soft Pastel, Photo Overlay |
| Slide types | + quote, myth_fact, big_number, steps |
| Brand Theme | picker фон+акцент → авто-токены + WCAG; `@handle` → CTA |
| Fonts | выбор пары из ~10 |
| Charts | `progress_bars`, `big_percent` |

**Тест №2: 30–50**, 7 дней, ≥3 карусели.  
Вопрос: сами без помощи? Нужны свои цвета под клиентов?

→ [план](./sprint-4/README.md) · [задачи](./sprint-4/tasks/)

## Sprint 5 — история, лимиты, multi-theme — **итерация 3 (часть 1)**

**Этап 2 · F2.5–F2.8, F2.11.**

- История проектов, free limits, ref links, админка  
- Несколько Brand Theme на юзера («под клиентов») + лимиты Free 1 / Pro 5  
- Лимиты font pairs по тарифу  
- Layout: Editorial / Corporate / Neon — **только если спрос из S2–4**  
- Types: before_after, question, author (+ comparison, photo по спросу)  

→ [план](./sprint-5/README.md) · [задачи](./sprint-5/tasks/)

## Sprint 6 — MP4 + Brand Kit / charts v2 — **итерация 3 (часть 2)**

**Этап 3 · F3.1–F3.4 · продолжение F9.1 / F9.6.**

- MP4 1080×1920, 2.5–4с/слайд, fade/slide/zoom, одна музыка, «Сделать рилс»  
- Анимация charts 0→value  
- Палитра из логотипа + лого на слайдах  
- Charts: `bar_chart`, `timeline`  

**Тест №3: 50–100** + early pay. Вопрос: платят? Тянут multi-theme?

→ [план](./sprint-6/README.md) · [задачи](./sprint-6/tasks/)

## Sprint 7 — video ingest

Presigned upload · ffprobe · H.264 CFR · proxy · poster · лимиты. Техтест 5–10.

## Sprint 8 — video на слайдах, trim, duration auto

## Sprint 9 — transitions + animation presets (темы)

## Sprint 10 — audio tracks v1 (music/voiceover/sfx + ducking)

→ видео-MVP, 100–300.

## Sprint 11 — платежи, тарифы, watermark

Лимиты тем/шрифтов в биллинге. Agency upload шрифтов — backlog после оплат (**F9.9**).

## Sprint 12 — стабильность, мониторинг, публичный MVP

---

## Когда звать людей

| После | N | Вопрос |
|-------|---|--------|
| S2 | 10–20 | Нужен результат? Какие стили берут? |
| S4 | 30–50 | Сами без помощи? Нужны свои цвета? |
| S6 | 50–100 | Платят? Тянут multi-theme / лого? |
| S9–10 | 100–300 | Экономика видео? |

## Не делать до первого теста (S2)

Сложный timeline, полный Brand Kit UI, upload шрифтов, команды, MAX, RN, 4K, keyframes, Excel-charts, 8 layout-стилей сразу.
