# Sprint 3 — варианты, ZIP, подготовка каналов

**Статус:** запланирован · **Тест:** продолжение №1, 3–5 проектов на человека

## Цель

1. Второй шаг после album: вариант / текст / стиль / ZIP.  
2. Подготовить identity/статусы под веб-редактор и будущие каналы.

**Фичи:** F1.5, F1.6, F1.7 · подготовка F2.1 auth / F0.3 identities

## Чеклист

- [ ] F1.5 — вариант / текст / стиль ([task 01](./tasks/01-result-actions.md))
- [ ] F1.6 — immutable versions ([task 02](./tasks/02-project-versions.md))
- [ ] F1.5 — ZIP из PNG в Blob (серверная сборка; клиентский html-to-image — S4) ([task 03](./tasks/03-zip-export.md))
- [ ] Промпты / retry ([task 04](./tasks/04-prompt-quality.md))
- [ ] Воронка + gate ([task 05](./tasks/05-funnel-feedback.md))
- [ ] Схема: `user_identities` (или совместимый план миграции с `telegram_id`) + статусы project `draft|generated|editing|exported|rendering|delivered` ([task 06](./tasks/06-identities-project-status.md))

## Критерии выхода

- [ ] Юзер сам делает вариант/стиль и получает новый album
- [ ] ZIP = полный упорядоченный набор PNG
- [ ] Export привязан к version
- [ ] В БД/доках зафиксирован путь к channel-agnostic `users.id`
- [ ] Ретро: go Mini App (S4) с путём A/B

## TBD

- «Редактировать» → waitlist или signed stub без полного editor.
- Клиентский ZIP и upload фото — **Sprint 4**.

## Не входит

html-to-image, Mini App editor, WA/VK адаптеры, Playwright, тарифы.

## Ретро

_(gate · backlog S4: client export, CORS Blob, iOS)_
