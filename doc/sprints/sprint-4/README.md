# Sprint 4 — Mini App + итерация 2 (Brand Theme / types / charts)

**Статус:** запланирован · **Тест №2:** 30–50 пользователей, 7 дней, ≥3 карусели  
**Итерация брейншторма:** **2** — picker темы, fonts, расширенные types, charts v1, +2 layout-стиля

## Цель

Расширить lean editor из Sprint 1: Mini App `initData`, Brand Theme / fonts, новые types/styles, charts v1, re-export в Telegram (путь B).

**Roadmap:** [этап 2](../../roadmap/ROADMAP.md#2--mini-app--веб-редактор) · **Фичи:** F2.1 (initData), F2.3, F2.4, F2.4b, F2.9, F2.10, F2.12, часть F9.6

## Зависимости

- **Sprint 1:** shared slides, signed `/e/{id}`, текст/порядок, client ZIP (путь A).
- Sprint 3: versions, Blob ZIP, schema `layout×theme`, ≥6 цветовых пресетов, go/no-go gate.
- Приоритет Soft Pastel / Photo Overlay и types — из ретро S2–3.

## Чеклист

### Mini App и re-export

- [ ] F2.1 — Mini App shell + `initData` поверх signed editor ([task 01](./tasks/01-miniapp-shell.md))
- [ ] F2.2 (расширение) — add/delete slides ([task 02](./tasks/02-editor-slides.md))
- [ ] F2.3 / F2.4 — смена layout/theme, re-export album (путь B) ([task 03](./tasks/03-style-reexport.md))
- [ ] F2.4b — upload фото → Blob ([task 03](./tasks/03-style-reexport.md) или follow-up)

### Итерация 2 — визуал и бренд

- [ ] F2.9 — своя тема: 2 цвета + авто-токены + контраст ([task 04](./tasks/04-theme-picker.md))
- [ ] F2.10 — font pair из ~10 + `@handle` в теме → CTA ([task 05](./tasks/05-fonts-handle.md))
- [ ] F2.12 — types: quote, myth_fact, big_number, steps ([task 06](./tasks/06-slide-types-v2.md))
- [ ] Layout styles: Soft Pastel, Photo Overlay ([task 06](./tasks/06-slide-types-v2.md))
- [ ] F9.6 (часть) — `progress_bars`, `big_percent` ([task 07](./tasks/07-charts-v1.md))

### Тест

- [ ] Тест №2: activation / вторая карусель / ZIP vs album / «нужны свои цвета?» ([task 08](./tasks/08-closed-test-2.md))

## Критерии выхода

- [ ] Пользователь правит в Mini App или `/e/{id}` и получает album (B) и/или ZIP (A) без помощи
- [ ] Сохранение своей темы (1 на Free) и применение к проекту
- [ ] Font pair меняется без поломки кириллицы в preview, client ZIP и server render
- [ ] Хотя бы 2 новых type и 1 chart type реально используются в тестовых каруселях
- [ ] Soft Pastel и/или Photo Overlay доступны, если ретро S3 их приоритизировал
- [ ] Метрики: activation 40–60% до экспорта; 20–30% вторая карусель (ориентир)

## Не входит

Базовый signed editor + client ZIP (**уже Sprint 1**). Multi-theme «под 5 клиентов», палитра из лого, upload шрифтов, MP4, bar_chart/timeline, drag stickers, админка.

## Ретро

_(нужны ли свои цвета · ZIP vs альбом · какие types/styles зашли · вход в S5 multi-theme)_
