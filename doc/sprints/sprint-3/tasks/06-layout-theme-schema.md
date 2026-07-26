# 06 — Схема layout × theme + цветовые пресеты

Закрыть gap MVP из брейншторма: **6–8 пресетных цветовых тем** и раздельные оси, без UI кастома.

**Подготовка F2.9 · Зависимости:** Zod project schema (S0), styles meta (S0), feedback стилей из S2

## Scope

- В схеме/типах: `layoutId` (характер вёрстки) + `themeId` | inline theme tokens (цвета, fontPair, handle)
- Обратная совместимость: старые `themeId` (`expert_minimal` …) читаются как bundle → layout + default theme
- Meta: 6–8 цветовых пресетов (Tailwind-подобные токены); 3 layout-стиля MVP остаются
- Бот «Другой стиль» / выбор стиля: может менять layout, theme или оба — явно в UX-копирайте
- Рендер по-прежнему только через CSS/JSON tokens, без hex в компонентах
- Документировать маппинг в [layout-styles.md](../../../product/layout-styles.md) / [brand-kits.md](../../../product/brand-kits.md)

## Done when

- [ ] Fixture и live project проходят Zod с раздельными layout + theme
- [ ] Старые 3 bundle id не ломают существующих пользователей/фикстуры
- [ ] В meta ≥6 цветовых пресетов; каждый даёт читаемый контраст (WCAG text ≥ 4.5:1 на фоне)
- [ ] Смена пресета в боте перекрашивает карусель без повторной LLM-генерации контента
- [ ] `onAccent` / muted / surface либо в пресете, либо считаются детерминированно
- [ ] Нет UI color picker и нет upload шрифтов (это S4 / Agency)

## Не входит

Picker двух цветов, сохранение «моих тем» на юзера, Soft Pastel/Photo Overlay render (S4), charts.

## Связанные документы

- [Brand kits](../../../product/brand-kits.md)
- [Layout styles](../../../product/layout-styles.md)
- [Архитектура](../../../project/ARCHITECTURE.md)
- [SPRINTS — карта итераций](../../SPRINTS.md)
