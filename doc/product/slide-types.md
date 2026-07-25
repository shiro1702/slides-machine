# Типы слайдов (slide types)

Источник: [brainstorm 25.07.2026-styles-themes](../brainstorms/25.07.2026-styles-themes-INDEX.md).

**Slide type** = ЧТО на слайде (структура контента). Независим от [layout-стиля](./layout-styles.md) и [Brand Theme](./brand-kits.md).

В коде Sprint 0–2 роль близка к `layout` id (`cover_center`, `text_only`, …). Целевая модель: семантический `type` → layout-компонент внутри выбранного layout-стиля.

## Обязательные (MVP / Sprint 1–2)

| type | Роль | Контент |
|------|------|---------|
| `hook` | Обложка, останавливает скролл | Крупный заголовок + опц. подзаголовок |
| `text` | Одна мысль | Заголовок + 2–4 строки |
| `numbered` | Пункт серии «5 ошибок» | Крупная цифра + заголовок + пояснение |
| `checklist` | Список ✓/✗ | Заголовок + 3–6 пунктов |
| `cta` | Финал | Призыв + @handle / «сохрани» |

≈ текущие layouts: `cover_center`, `text_only`, `text_big_number` / badge, `checklist`, `cta`.

## Сильно желательные (Sprint 3–4)

| type | Роль | Контент |
|------|------|---------|
| `quote` | Ключевая мысль | Текст в кавычках + опц. автор |
| `myth_fact` | Разрушение мифа | Блок «Миф» + блок «Факт» |
| `big_number` | Статистика-герой | Огромное число + подпись |
| `steps` | Шаг инструкции | «Шаг 2 из 5» + заголовок + описание |

Плюс инфографика: `progress_bars`, `big_percent` — см. [charts.md](./charts.md).

## Опциональные (Sprint 5+)

| type | Роль | Контент |
|------|------|---------|
| `before_after` | Контраст | Две колонки / два блока |
| `question` | Вовлечение в комменты | Крупный вопрос + подводка |
| `photo` | Фото + подпись | Изображение + текст (нужен Photo Overlay) |
| `comparison` | А vs Б | Две колонки плюсы/минусы |
| `author` | Визитка перед CTA | Имя, регалии, польза |

Позже charts: `bar_chart`, `timeline` ([charts.md](./charts.md)).

## Пример project JSON (целевой)

```json
{
  "layout": "bold_marketing",
  "theme": "theme_client_coffee",
  "slides": [
    { "type": "hook", "title": "5 ошибок при покупке квартиры" },
    { "type": "numbered", "number": 1, "title": "Смотреть только на цену", "text": "..." },
    { "type": "big_number", "value": "73%", "caption": "покупателей не читают договор" },
    { "type": "checklist", "title": "Проверьте перед сделкой", "items": ["...", "..."] },
    { "type": "cta", "text": "Сохрани, чтобы не потерять", "handle": "@realty_expert" }
  ]
}
```

## Паттерны структур для LLM

| Паттерн | Последовательность |
|---------|-------------------|
| Ошибки | `hook` → `numbered` × N → `big_number` → `checklist` → `cta` |
| Инструкция | `hook` → `steps` × N → `quote` → `cta` |
| Мифы | `hook` → `myth_fact` × N → `text` → `cta` |
| Кейс | `hook` → `before_after` → `steps` × 3 → `author` → `cta` |

Связь с carousel templates (`expert_list`, `mistakes`, …) в `lib/meta/templates.ts`: template = именованный паттерн ролей; slide type = атомарный блок внутри паттерна.

Промпты: [prompts.md](./prompts.md).
