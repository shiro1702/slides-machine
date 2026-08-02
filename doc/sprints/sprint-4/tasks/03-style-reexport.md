# 03 — Смена стиля и re-export (путь B)

**Фичи:** F2.3, F2.4 · **Зависимости:** S3 layout×theme schema, Sprint 1 editor, task 02

## Scope

- Выбор `layoutId` и/или `themeId` (пресет) в Mini App / editor
- Re-export PNG album через существующий Remotion worker (путь B) без повторной LLM
- Кнопка «Отправить в Telegram» → album
- Опционально: upload фото → Blob (F2.4b) — client upload с CORS для пути A
- Client ZIP (путь A) уже в Sprint 1 — не переписывать, только убедиться что новая version попадает в ZIP

## Done when

- [ ] Смена только theme перекрашивает все слайды
- [ ] Смена layout сохраняет content types, где совместимо
- [ ] Re-export идемпотентен по version id
- [ ] `delivered` (server) логируется отдельно от `exported` (client, S1)

## Связанные документы

- [RENDER.md](../../../dev/RENDER.md)
- [Sprint 1 — client ZIP](../../sprint-1/tasks/04-client-zip.md)
