# 04 — Качество промптов и retry

Улучшить контент по повторяющимся проблемам закрытого теста, сохранив измеримость изменений.

**Связано с:** F1.2, F1.5 · **Зависимости:** feedback Sprint 2, versioning

## Scope

- Параметры ниши, tone, content goal и template
- Паттерны последовательности slide types (Ошибки / Инструкция / Мифы / Кейс) — см. [prompts.md](../../../product/prompts.md)
- Ограничения длины для headline/body/CTA с учётом layouts
- Prompt/version id в metadata каждой project version
- Repair отдельно от creative regeneration
- Небольшой regression set реальных обезличенных кейсов

## Done when

- [ ] Каждое изменение prompt связано с наблюдаемой категорией ошибки
- [ ] Regression set проверяет schema validity, длины, hook, структуру и CTA
- [ ] System/user prompt явно задаёт паттерн types (первый = hook, последний = cta)
- [ ] Prompt version позволяет сравнить first-pass validity и пользовательский outcome
- [ ] Repair не меняет смысл текста без необходимости и имеет лимит попыток
- [ ] «Другой вариант» создаёт действительно альтернативную структуру/формулировки
- [ ] Пользовательские примеры обезличены и не попадают в prompt/log без необходимости

## Связанные документы

- [AI-промпты](../../../product/prompts.md)
- [Типы слайдов](../../../product/slide-types.md)
- [Slide rendering engine](../../../product/slide-engine.md)
