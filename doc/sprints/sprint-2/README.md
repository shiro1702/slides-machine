# Sprint 2 — PNG + media group

**Статус:** код готов · закрытый тест после deploy · **Тест:** закрытый №1, 10–20 пользователей

## Цель

Замкнуть первый пользовательский цикл: тема → JSON → PNG → Telegram album и проверить, нужен ли людям итоговый результат.

**Roadmap:** [этап 1 — PNG в Telegram](../../roadmap/ROADMAP.md#1--png-в-telegram) · **Фичи:** F1.3, F1.4, F1.8 и измерение F1.7

## Зависимости

- Sprint 1 стабильно создаёт валидный project JSON и queued `render_carousel` job.
- Blob доступен; meta шаблонов/layouts согласована с Zod-схемой.

## Чеклист

- [x] Первые templates/layouts реализованы как React/Remotion-compatible компоненты ([task 01](./tasks/01-slide-templates.md))
- [x] F1.3 — серверный PNG-render воспроизводимо создаёт все слайды ([task 02](./tasks/02-png-render.md))
- [x] F1.8 — job проходит queue lifecycle и сохраняет outputs в Blob ([task 03](./tasks/03-render-queue-storage.md))
- [x] F1.4 — Telegram получает album в правильном порядке ([task 04](./tasks/04-telegram-media-group.md))
- [ ] Закрытый тест измеряет время до usable carousel и сигнал спроса ([task 05](./tasks/05-closed-test.md)) — [скрипт](./test-script.md)

## Критерии выхода

- [x] Пользователь получает готовый album без ручной операции команды *(в коде; live после env)*
- [x] Одинаковый project JSON даёт визуально одинаковые PNG
- [x] Ошибка одного job не блокирует следующие; retry не дублирует album
- [ ] p50 time to first result и доля результата ≤3 минут измеряются *(после закрытого теста)*
- [ ] Собраны ответы: понятен ли бот, можно ли публиковать, что переписывают, хотят ли ещё
- [ ] Зафиксировано распределение выбора стилей (3 bundle) — вход в S3 пресеты / S4 Soft Pastel|Photo Overlay

## MVP визуала (брейншторм · итерация MVP)

| Ось | Объём |
|-----|--------|
| Styles | 3 bundle (= layout + цвета + шрифты) |
| Types | hook / text / numbered / checklist / cta |
| Brand Theme | нет отдельного слоя |
| Charts | нет |

Gap к целевому MVP брейншторма (6–8 цветовых пресетов) закрывается в **Sprint 3** task 06.

## Gate этапа

**Вопрос:** нужен ли результат? Какие стили берут?

Цель — usable carousel ≤2–3 минут. Сильный сигнал: публикация без существенных переделок и добровольный возврат за второй каруселью. Решение о продолжении фиксируется в ретро, не подменяется одной vanity-метрикой.

## Не входит

Кнопки вариантов/стиля, ZIP, Mini App, MP4, Brand Kit picker, charts, масштабирование на публичный трафик.

## Ретро

_(в конце: метрики, обратная связь и решение continue/change/stop)_
