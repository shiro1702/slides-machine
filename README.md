# slides-machine

AI-студия контента: **тема → карусель → рилс**. MVP-канал — Telegram-бот + Mini App.

Текущий спринт: **Sprint 2** (JSON → PNG → Telegram album). Документация: [`doc/`](./doc/README.md).

## Stack

- Next.js (App Router) + Tailwind
- Remotion layouts + server PNG (`renderStill` / layout fallback)
- Zod project schema
- Neon Postgres (Drizzle) + job worker
- Vercel Blob
- Telegram Bot webhook + media group
- Vercel AI SDK + Groq (или `LLM_MODE=fixture`)

## Setup

```bash
# Node >= 20 (рекомендуется 22)
nvm use 22
npm install
cp .env.example .env.local
# заполнить DATABASE_URL, BLOB_READ_WRITE_TOKEN, TELEGRAM_*, GROQ_API_KEY
```

### Scripts

| Command | What |
|---------|------|
| `npm run dev` | Next.js local |
| `npm run build` | Production build |
| `npm run test` | Unit tests (vitest) |
| `npm run validate:schema` | Zod fixtures (Mistakes × 3 formats) |
| `npm run generate:smoke` | Fixture/Groq JSON for 3 niches |
| `npm run db:generate` | Drizzle migration from schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:smoke` | Insert user → project → job |
| `npm run db:flow-smoke` | Flow generation → ready project + queued job |
| `npm run render:smoke` | Fixtures → PNG + manifest (layout backend) |

### Telegram webhook

После деплоя на Vercel:

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=$NEXT_PUBLIC_APP_URL/api/telegram/webhook" \
  -d "secret_token=$TELEGRAM_WEBHOOK_SECRET"
```

Header `X-Telegram-Bot-Api-Secret-Token` проверяется в [`app/api/telegram/webhook`](./app/api/telegram/webhook/route.ts).

Flow: `/start` → `/new` → ниша → тема → стиль → JSON + `render_carousel` → worker PNG → Telegram album.

Worker: `POST /api/jobs/worker` (Bearer `CRON_SECRET`) + Vercel Cron раз в сутки (Hobby; на Pro можно чаще).

### Blob smoke

```bash
curl -X POST "$NEXT_PUBLIC_APP_URL/api/blob/smoke"
```

## Docs

- [Sprint 2](./doc/sprints/sprint-2/README.md)
- [Sprint 1](./doc/sprints/sprint-1/README.md)
- [Sprint 0](./doc/sprints/sprint-0/README.md)
- [Architecture](./doc/project/ARCHITECTURE.md)
- [Env setup](./doc/dev/ENV_SETUP.md)
- [Deploy](./doc/dev/DEPLOY.md)
