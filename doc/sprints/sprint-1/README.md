# Sprint 1 — бот: тема → структура JSON

**Статус:** запланирован · **Тест:** внутренний, основатель + 2–3 SMM

## Цель

Провести пользователя по короткому Telegram-flow и получить валидный, сохранённый project JSON, готовый к рендеру в следующем спринте.

**Roadmap:** [этап 1 — PNG в Telegram](../../roadmap/ROADMAP.md#1--png-в-telegram) · **Фичи:** F1.1, F1.2 и основа для F1.7/F1.8

## Зависимости

- Sprint 0 завершён: Zod-схема, meta, Neon и Telegram webhook доступны.
- Выбран один LLM provider для MVP; provider abstraction не должна блокировать первый flow.

## Чеклист

- [ ] F1.1 — flow `/start`/`/new` → ниша → тема → стиль ([task 01](./tasks/01-telegram-flow.md))
- [ ] F1.2 — LLM возвращает structured carousel JSON, прошедший Zod ([task 02](./tasks/02-llm-json.md))
- [ ] User и draft project сохраняются в Neon; создаётся job на следующий этап ([task 03](./tasks/03-project-persistence.md))
- [ ] Ошибки, latency и шаги flow наблюдаемы без утечки пользовательского текста/секретов ([task 04](./tasks/04-errors-telemetry.md))

## Критерии выхода

- [ ] Новый пользователь проходит flow без ручной правки состояния
- [ ] Для каждой из 3 ниш получен минимум один валидный fixture-like project JSON
- [ ] Проект связан с Telegram user и повторно читается из Neon
- [ ] Невалидный ответ LLM автоматически исправляется ограниченное число раз или завершается понятной ошибкой
- [ ] Внутренний тест с 2–3 SMM выявил блокеры до PNG-render

## Метрики

- Доля flow, дошедших до генерации JSON
- Доля валидных ответов с первой попытки и после retry
- p50/p95 времени LLM-генерации

Целевые продуктовые метрики этапа измеряются после появления PNG в Sprint 2.

## Не входит

PNG-render, media group, ZIP, Mini App, платежи и сложный conversational AI.

## Ретро

_(в конце)_
