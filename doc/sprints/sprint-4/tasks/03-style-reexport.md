# 03 — Смена стиля и re-export

**Фичи:** F2.3, F2.4 · **Зависимости:** S3 layout×theme schema, task 02

## Scope

- Выбор `layoutId` и/или `themeId` (пресет) в Mini App
- Re-export PNG album + ZIP без повторной LLM, если контент не менялся
- Кнопка возврата в бот с новым album

## Done when

- [ ] Смена только theme перекрашивает все слайды
- [ ] Смена layout сохраняет content types, где совместимо
- [ ] Re-export идемпотентен по version id
