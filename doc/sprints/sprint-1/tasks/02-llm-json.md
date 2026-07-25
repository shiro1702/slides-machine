# 02 — LLM → валидный carousel JSON

Преобразовать параметры flow в структурированный проект, совместимый с канонической Zod-схемой.

**Фича:** F1.2 · **Зависимости:** task 01, Sprint 0 JSON schema/templates

## Scope

- Prompt с темой, нишей, стилем, целью и выбранным template
- Structured output/JSON mode провайдера, если доступен
- Zod validation и ограниченный repair/retry
- Нормализация ответа без markdown fences и лишнего текста

## Done when

- [ ] LLM получает только необходимые параметры и идентификаторы из server-side meta
- [ ] Ответ парсится и валидируется до записи как готовый draft
- [ ] Retry ограничен и различает provider error, invalid JSON и schema mismatch
- [ ] Fixture-набор покрывает 3 ниши, кириллицу, длинную тему и потенциально опасный input
- [ ] На успешных fixtures есть cover hook, содержательные слайды и CTA
- [ ] Логи не содержат provider key и полный prompt/user content по умолчанию

## Связанные документы

- [AI-промпты](../../../product/prompts.md)
- [JSON-схема Sprint 0](../../sprint-0/tasks/01-json-schema.md)
