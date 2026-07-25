# slides-machine

AI-студия контента: **тема → карусель → рилс**. MVP-канал — Telegram-бот + Mini App.

Текущий спринт: **Sprint 0** (фундамент). Документация: [`doc/`](./doc/README.md).

## Stack

- Next.js (App Router) + Tailwind
- Remotion Player (preview stub)
- Zod project schema
- Neon Postgres (Drizzle)
- Vercel Blob
- Telegram Bot webhook

## Setup

```bash
# Node >= 20 (рекомендуется 22)
nvm use 22
npm install
cp .env.example .env.local
# заполнить DATABASE_URL, BLOB_READ_WRITE_TOKEN, TELEGRAM_*
```

### Scripts

| Command | What |
|---------|------|
| `npm run dev` | Next.js local |
| `npm run build` | Production build |
| `npm run validate:schema` | Zod fixtures (Mistakes × 3 formats) |
| `npm run db:generate` | Drizzle migration from schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:smoke` | Insert user → project → job |

### Telegram webhook

После деплоя на Vercel:

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=$NEXT_PUBLIC_APP_URL/api/telegram/webhook" \
  -d "secret_token=$TELEGRAM_WEBHOOK_SECRET"
```

Header `X-Telegram-Bot-Api-Secret-Token` проверяется в [`app/api/telegram/webhook`](./app/api/telegram/webhook/route.ts).

### Blob smoke

```bash
curl -X POST "$NEXT_PUBLIC_APP_URL/api/blob/smoke"
```

## Docs

- [Sprint 0](./doc/sprints/sprint-0/README.md)
- [Architecture](./doc/project/ARCHITECTURE.md)
- [Env setup](./doc/dev/ENV_SETUP.md)
- [Deploy](./doc/dev/DEPLOY.md)
