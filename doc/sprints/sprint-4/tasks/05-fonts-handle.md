# 05 — Font pairs и @handle

**Фича:** F2.10 · **Зависимости:** curated fonts в assets, theme schema

## Scope

- Каталог ~10 пар (heading+body), все с кириллицей, OFL
- Выбор `fontPair` в теме; синхрон preview ↔ Remotion/server
- Поле `@handle` в теме → автоподстановка в slides type `cta`
- Free: 3 пары; остальные — флаг Pro (enforce можно мягко до S5)

## Done when

- [ ] Смена пары не ломает safe area на fixture с длинным кириллическим заголовком
- [ ] CTA показывает handle из темы без ручного ввода на каждом слайде
- [ ] Нет upload `.ttf` (F9.9)

## Связанные документы

- [brand-kits.md](../../../product/brand-kits.md)
