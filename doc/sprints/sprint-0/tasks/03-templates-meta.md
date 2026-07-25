# 03 — Шаблоны и ниши (meta only)

Без полного рендера: JSON/таблицы meta.

**Фича:** F0.7 · **Зависимость:** task 01 (enum идентификаторов)

## Scope

- Ниши: эксперты, недвижимость, SMM
- 5–7 структурных carousel templates
- 3 стартовых визуальных стиля
- 10–12 layout ids без реализации React-компонентов

## Done when

- [x] Для 3 ниш описаны slug, аудитория, тон и допустимые цели контента
- [x] Для 5–7 templates заданы slug, назначение и последовательность ролей слайдов
- [x] Для 3 visual styles заданы slug и базовые theme tokens
- [x] 10–12 layout ids из [slide-engine.md](../../../product/slide-engine.md) занесены в enum схемы
- [x] Все ссылки `templateId`, `themeId` и `layout` в fixture проходят валидацию

## Не входит

Полный React-render шаблонов, загрузка картинок и brand kit UI.

## Связанные документы

- [Slide rendering engine](../../../product/slide-engine.md)
- [Brand kits](../../../product/brand-kits.md)
