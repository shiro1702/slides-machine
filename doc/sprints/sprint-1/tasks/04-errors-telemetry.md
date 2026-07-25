# 04 — Ошибки и telemetry генерации

Сделать внутренний тест наблюдаемым и не оставлять пользователя в состоянии «⏳» без ответа.

**Фичи:** основа F1.7/F1.8 · **Зависимости:** tasks 01–03

## Scope

- События: `flow_started`, `niche_selected`, `topic_submitted`, `style_selected`, `generation_started/succeeded/failed`
- Correlation id между Telegram update, project и job
- Понятные сообщения при timeout/provider/schema/internal error
- Минимальный просмотр ошибок через текущие platform logs/DB, без отдельной админки

## Done when

- [x] Каждое событие имеет user/project id, timestamp и безопасные технические свойства
- [x] Путь одной генерации собирается по correlation id
- [x] Пользователь получает retry/new-project action после recoverable error
- [x] Timeout не оставляет project/job в промежуточном статусе
- [x] В telemetry нет токенов, connection strings и полного пользовательского контента
- [x] Можно посчитать completion rate, first-pass validation и latency

## Связанные документы

- [Реестр фич](../../../project/FEATURES.md)
- [Мессенджеры и боты](../../../project/BOT_MESSENGERS.md)
