# 02 — Окружение Vercel + Neon + Blob + Bot

Поднять минимальный production-like контур, на котором продолжатся следующие спринты.

**Фичи:** F0.2, F0.4, F0.5 · **Зависимости:** task 01 для импорта общей схемы не обязательна

## Scope

- Next.js app и Vercel preview/production environment
- Подключения к Neon и Vercel Blob через env
- Telegram webhook и минимальная команда `/start`
- Без бизнес-flow генерации карусели

## Done when

- [ ] Next.js app собирается и задеплоен на Vercel
- [ ] `DATABASE_URL` и остальные секреты настроены только через env
- [ ] Blob token проходит test upload и удаление тестового объекта
- [ ] BotFather token и webhook secret настроены; webhook указывает на `/api/telegram/webhook`
- [ ] `/start` отвечает коротким сообщением из задеплоенного окружения
- [ ] В логах нет токенов, connection strings и полного Telegram update

## Связанные документы

- [ENV setup](../../../dev/ENV_SETUP.md)
- [Deploy](../../../dev/DEPLOY.md)
- [Мессенджеры и боты](../../../project/BOT_MESSENGERS.md)
