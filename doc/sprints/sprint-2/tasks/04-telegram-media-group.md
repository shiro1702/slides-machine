# 04 — Telegram media group

Доставить готовые PNG как нативный Telegram album и завершить пользовательский flow.

**Фича:** F1.4 · **Зависимости:** task 03 completed job

## Scope

- Статусное сообщение «генерируем» и его завершение/замена
- `sendMediaGroup` с PNG в порядке scenes
- Короткий caption/instruction после album
- Идемпотентная доставка и понятная ошибка

## Done when

- [ ] Album содержит все слайды в правильном порядке
- [ ] Количество слайдов учитывает лимит одного media group; превышение обработано явно
- [ ] Повтор delivery не отправляет второй album при уже сохранённом Telegram message result
- [ ] Пользователь не остаётся с вечным progress message при failed job
- [ ] Delivery event связывает project/job и Telegram message ids
- [ ] PNG читаемы в Telegram mobile без дополнительного открытия файла

## Связанные документы

- [Мессенджеры и боты](../../../project/BOT_MESSENGERS.md)
- [Статичные карусели](../../../product/carousels.md)
