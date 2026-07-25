# Sprint 6 — MP4 + Brand Kit / charts v2

**Статус:** запланирован · **Тест №3:** 50–100 + early pay  
**Итерация брейншторма:** **3 (часть 2)** — рилс из слайдов + лого/палитра + charts v2

## Цель

Тот же project JSON → animated MP4; усилить Brand Kit (лого) и charts для «дорогого» рилса.

**Roadmap:** [этап 3 — MP4](../../roadmap/ROADMAP.md#3--mp4-из-слайдов) · **Фичи:** F3.1–F3.4, часть F9.1 / F9.6

## Зависимости

- S4–5: themes, charts v1, multi-theme.
- Worker/VPS capacity для Remotion MP4 ([DEPLOY](../../dev/DEPLOY.md)).

## Чеклист

- [ ] F3.1 — VPS/worker для Remotion MP4 ([task 01](./tasks/01-mp4-worker.md))
- [ ] F3.2 — animated slides → 1080×1920 MP4 ([task 02](./tasks/02-mp4-render.md))
- [ ] F3.3 — одна музыка + F3.4 кнопка «Сделать рилс» ([task 03](./tasks/03-music-cta.md))
- [ ] Анимация charts 0→value ([task 04](./tasks/04-chart-animation.md))
- [ ] F9.6 — `bar_chart`, `timeline` ([task 05](./tasks/05-charts-v2.md))
- [ ] F9.1 (часть) — палитра из лого + лого на слайдах ([task 06](./tasks/06-logo-palette.md))
- [ ] Тест №3 + early pay signal ([task 07](./tasks/07-closed-test-3.md))

## Критерии выхода

- [ ] Из карусели один тап → MP4 в TG (или ссылка)
- [ ] Charts в рилсе анимируются; PNG остаётся статичным
- [ ] Лого клиента опционально на hook/cta
- [ ] Есть сигнал готовности платить (пакет или подписка)

## Не входит

User video ingest (S7), полный timeline editor, upload шрифтов, ЮKassa prod (S11).

## Ретро

_(платят ли · нужен ли video ingest дальше · нагрузка worker)_
