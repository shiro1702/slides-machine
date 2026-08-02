# Фундамент — бот: тема → структура JSON

> **Архив.** Бывший Sprint 1 (нумерация до hybrid-remap).  
> Код готов. Актуальный **Sprint 1** = shared slides + editor + client ZIP → [../sprint-1/](../sprint-1/README.md).

**Статус:** код готов · live-тест после env · **Тест:** внутренний, основатель + 2–3 SMM

## Цель

Провести пользователя по короткому Telegram-flow и получить валидный, сохранённый project JSON, готовый к рендеру / редактору.

**Roadmap:** [этап 1 — PNG в Telegram](../../roadmap/ROADMAP.md#1--png-в-telegram) · **Фичи:** F1.1, F1.2 и основа для F1.7/F1.8

## Зависимости

- Sprint 0 завершён: Zod-схема, meta, Neon и Telegram webhook доступны.
- LLM: Groq (`GROQ_API_KEY`) или `LLM_MODE=fixture` без ключа.

## Чеклист

- [x] F1.1 — flow `/start`/`/new` → ниша → тема → стиль ([task 01](./tasks/01-telegram-flow.md))
- [x] F1.2 — LLM возвращает structured carousel JSON, прошедший Zod ([task 02](./tasks/02-llm-json.md))
- [x] User и draft project сохраняются в Neon; создаётся job на следующий этап ([task 03](./tasks/03-project-persistence.md))
- [x] Ошибки, latency и шаги flow наблюдаемы без утечки пользовательского текста/секретов ([task 04](./tasks/04-errors-telemetry.md))

## Критерии выхода

- [x] Новый пользователь проходит flow без ручной правки состояния *(код + unit/fixture; live TG — после env)*
- [x] Для каждой из 3 ниш получен минимум один валидный fixture-like project JSON (`npm run generate:smoke`)
- [ ] Проект связан с Telegram user и повторно читается из Neon *(нужен `DATABASE_URL` + `npm run db:flow-smoke`)*
- [x] Невалидный ответ LLM автоматически исправляется ограниченное число раз или завершается понятной ошибкой
- [ ] Внутренний тест с 2–3 SMM выявил блокеры до PNG-render *(нужны секреты + deploy)*

## Метрики

- Доля flow, дошедших до генерации JSON
- Доля валидных ответов с первой попытки и после retry
- p50/p95 времени LLM-генерации

Целевые продуктовые метрики этапа измеряются после появления PNG (Sprint 2) и client ZIP (Sprint 1 hybrid).

## Не входит

PNG-render, media group, ZIP, Mini App, платежи и сложный conversational AI.

## Live env (ещё нужно)

| Секрет | Зачем |
|--------|--------|
| `DATABASE_URL` | flow state, project, job |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_WEBHOOK_SECRET` | бот |
| Публичный URL / tunnel | webhook |
| `GROQ_API_KEY` | реальная LLM (иначе fixture) |

## Ретро

_(в конце)_
