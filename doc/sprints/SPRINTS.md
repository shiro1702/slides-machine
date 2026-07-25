# Спринты

**1 спринт ≈ 1 неделя** (соло: 1–2 нед). Текущий: **Sprint 0**.  
Фичи: [../project/FEATURES.md](../project/FEATURES.md). Источник плана: brainstorm 24.07.2026.

---

## Sprint 0 — архитектура и скелет *(сейчас)*

JSON-схема project/scenes/elements/theme/export · форматы 1080² / 4:5 / 9:16 · ниши · 5–7 шаблонов · Vercel+Neon+Blob+TG bot · сущности БД.  
**Юзеров не зовём.** → [sprint-0/](./sprint-0/README.md)

## Sprint 1 — бот: тема → структура JSON

Flow /start → ниша → тема → стиль → LLM JSON · user/project/scenes · логи.  
Тест: внутренний (вы + 2–3 SMM).

## Sprint 2 — PNG + media group

Render → storage → TG album · 3 стиля · очередь jobs.  
**Закрытый тест №1: 10–20** (SMM, эксперты, риелторы).  
Метрика: time to first usable carousel **≤ 2–3 мин**.

Вопросы теста: понятен ли бот? можно выложить? что переписывают? хотят «ещё»?

## Sprint 3 — кнопки и промпты

`[Другой вариант] [Измени текст] [Другой стиль] [ZIP] [Редактировать]` · версии · аналитика воронки.  
Продолжение теста №1, 3–5 проектов на человека.

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
