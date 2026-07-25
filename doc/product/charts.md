# Диаграммы (infographic slides)

Источник: [brainstorm 25.07.2026-styles-themes](../brainstorms/25.07.2026-styles-themes-INDEX.md).

Не Excel-charts. Нужны **инфографические слайды**: мало данных, сильный визуал, SVG/HTML → web preview и Remotion.

## Принципы

1. Максимум **5 значений** на слайд (соцсети, не отчёт).
2. Данные: пользователь **или** AI из темы.
3. Рендер **SVG/HTML**, не тяжёлый chart-kit на старте.
4. Цвета — только из активной [Brand Theme](./brand-kits.md).
5. В рилсах бары/donut анимируются (рост 0 → value) дёшево и дорого выглядят.

## Типы

| type | Контент | Сложность | Когда |
|------|---------|-----------|-------|
| `progress_bars` | Заголовок + 3–5 строк «лейбл + %» | низкая | Итерация 2 (S3–4) |
| `big_percent` | Цифра + donut (stroke-dasharray) + подпись | низкая | Итерация 2 (S3–4) |
| `bar_chart` | 3–5 столбцов с подписями | средняя | Итерация 3 (S5–6) |
| `timeline` | Вертикальная линия + 3–5 точек/дат | низкая | Итерация 3 (S5–6) |
| `pie` | 3–4 сектора + легенда | средняя | позже |

## JSON (пример)

```json
{
  "type": "progress_bars",
  "title": "Куда уходит бюджет на ремонт",
  "items": [
    { "label": "Материалы", "value": 45 },
    { "label": "Работа", "value": 35 },
    { "label": "Мебель", "value": 20 }
  ],
  "unit": "%"
}
```

## Связь с реестром фич

`F9.6 Charts layouts` в [FEATURES.md](../project/FEATURES.md) дробится: сначала `progress_bars` + `big_percent`, остальное позже.

См. [slide-types.md](./slide-types.md) · [slide-engine.md](./slide-engine.md)
