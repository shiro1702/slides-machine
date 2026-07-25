# 02 — Серверный PNG-render

Рендерить каждый scene проекта в стабильный PNG на сервере.

**Фича:** F1.3 · **Зависимости:** task 01 и валидный project JSON

## Scope

- Remotion **`renderStill`** (Strategy B) — не Playwright/Satori как основной путь
- Render всех scenes в порядке проекта
- MVP-формат 1080×1350; smoke для 1080×1080 и 1080×1920
- Загрузка шрифтов и assets до capture (те же файлы, что у компонентов)
- Детерминированные filenames и manifest результата
- Worker/queue: не блокировать Telegram webhook

## Done when

- [ ] Render принимает project id/version, повторно валидирует JSON и не доверяет raw payload
- [ ] На выходе один PNG на scene и manifest с размером, порядком и content type
- [ ] Все файлы имеют ожидаемые dimensions и непрозрачный/оговорённый background
- [ ] Snapshot/visual fixtures покрывают 3 templates и 3 styles в приоритетном формате
- [ ] Ошибка scene завершает job контролируемо и не публикует неполный album
- [ ] Время и память render измеряются на целевом окружении (VPS/Railway предпочтительнее Vercel Functions)

## Связанные документы

- [Рендер: гибрид A/B/C](../../../dev/RENDER.md)
- [DEPLOY: Remotion worker](../../../dev/DEPLOY.md)
- [Статичные карусели](../../../product/carousels.md)
