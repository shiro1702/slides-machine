# Sprint 4 — Mini App v1 + итерация 2 (UI)

**Статус:** запланирован · **Тест №2:** 30–50 пользователей, 7 дней, ≥3 карусели  
**Итерация брейншторма:** **2** — picker темы, fonts, расширенные types, charts v1, +2 layout-стиля

## Цель

Дать самостоятельный цикл правок в Mini App и включить Brand Theme / fonts / новые типы без агентства-фич.

**Roadmap:** [этап 2 — Mini App](../../roadmap/ROADMAP.md#2--mini-app) · **Фичи:** F2.1–F2.4, F2.9, F2.10, F2.12, часть F9.6

## Зависимости

- Sprint 3: versions, ZIP, schema `layout×theme`, ≥6 цветовых пресетов, go/no-go gate.
- Приоритет Soft Pastel / Photo Overlay и types — из ретро S2–3.

## Чеклист

### Mini App editor

- [ ] F2.1 — Mini App shell + auth через Telegram ([task 01](./tasks/01-miniapp-shell.md))
- [ ] F2.2 — текст, порядок, add/delete slides ([task 02](./tasks/02-editor-slides.md))
- [ ] F2.3 / F2.4 — смена layout/theme, re-export PNG ([task 03](./tasks/03-style-reexport.md))

### Итерация 2 — визуал и бренд

- [ ] F2.9 — своя тема: 2 цвета + авто-токены + контраст ([task 04](./tasks/04-theme-picker.md))
- [ ] F2.10 — font pair из ~10 + `@handle` в теме → CTA ([task 05](./tasks/05-fonts-handle.md))
- [ ] F2.12 — types: quote, myth_fact, big_number, steps ([task 06](./tasks/06-slide-types-v2.md))
- [ ] Layout styles: Soft Pastel, Photo Overlay ([task 06](./tasks/06-slide-types-v2.md))
- [ ] F9.6 (часть) — `progress_bars`, `big_percent` ([task 07](./tasks/07-charts-v1.md))

### Тест

- [ ] Тест №2: activation / вторая карусель / «нужны свои цвета?» ([task 08](./tasks/08-closed-test-2.md))

## Критерии выхода

- [ ] Пользователь правит текст/порядок и получает новый album/ZIP без помощи
- [ ] Сохранение своей темы (1 на Free) и применение к проекту
- [ ] Font pair меняется без поломки кириллицы в preview и server render
- [ ] Хотя бы 2 новых type и 1 chart type реально используются в тестовых каруселях
- [ ] Soft Pastel и/или Photo Overlay доступны, если ретро S3 их приоритизировал
- [ ] Метрики: activation 40–60% до экспорта; 20–30% вторая карусель (ориентир)

## Не входит

Multi-theme «под 5 клиентов», палитра из лого, upload шрифтов, MP4, bar_chart/timeline, drag stickers, админка.

## Ретро

_(нужны ли свои цвета · какие types/styles зашли · вход в S5 multi-theme)_
