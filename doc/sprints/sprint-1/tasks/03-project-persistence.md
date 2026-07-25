# 03 — Сохранение проекта и постановка job

Сохранить результат генерации так, чтобы Sprint 2 мог забрать его на рендер без повторного вызова LLM.

**Фича:** основа F1.8 · **Зависимости:** tasks 01–02, Sprint 0 Neon schema

## Scope

- Upsert Telegram user
- Draft project до вызова LLM; `ready` после успешной валидации
- Job типа `render_carousel` в состоянии `queued`
- Идемпотентность по Telegram update/generation request

## Done when

- [x] Project хранит исходные параметры flow и валидный JSON payload
- [x] Успех атомарно переводит project в `ready` и создаёт ровно один queued job
- [x] Ошибка сохраняет диагностируемый project status без «вечного» queued job
- [x] Повтор webhook/callback возвращает существующий результат
- [x] Проект нельзя прочитать или изменить от имени другого Telegram user
- [ ] Интеграционный smoke проходит путь user → project → job *(нужен `DATABASE_URL`)*

## Связанные документы

- [Архитектура: пайплайн](../../../project/ARCHITECTURE.md#тема--карусель)
- [Минимальная схема Neon](../../sprint-0/tasks/04-neon-schema.md)
