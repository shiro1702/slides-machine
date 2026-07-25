# 03 — Очередь render jobs и Blob

Отвязать Telegram webhook от тяжёлого render и сохранить готовые outputs вне Postgres.

**Фича:** F1.8 · **Зависимости:** Sprint 1 queued job, task 02

## Scope

- Lifecycle `queued → processing → completed|failed`
- Lease/lock или другой безопасный способ взять job одним worker
- Ограниченный retry с backoff для временных ошибок
- PNG и manifest в Blob; ссылки/metadata в БД

## Done when

- [ ] Webhook подтверждает запрос без ожидания PNG-render
- [ ] Один job одновременно обрабатывает не более одного worker
- [ ] Зависший `processing` job можно безопасно вернуть в очередь
- [ ] Retry не создаёт конфликтующие outputs и имеет максимальное число attempts
- [ ] Completed job содержит Blob keys/URLs и render duration
- [ ] Failed job хранит безопасный error code/message; временные локальные файлы очищаются

## Связанные документы

- [Архитектура](../../../project/ARCHITECTURE.md)
- [Рендер: очередь](../../../dev/RENDER.md#очередь)
