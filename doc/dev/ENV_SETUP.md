# Env setup

Секреты не коммитить.

## Sprint 0

| Переменная | Где | Зачем |
|------------|-----|--------|
| `DATABASE_URL` | Neon Console | Postgres |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Файлы |
| `TELEGRAM_BOT_TOKEN` | BotFather | Бот |
| `TELEGRAM_WEBHOOK_SECRET` | сгенерировать | Verify webhook |

## Sprint 1

| Переменная | Зачем |
|------------|--------|
| `GROQ_API_KEY` | LLM → carousel JSON (Vercel AI SDK + Groq) |
| `LLM_MODE` | `fixture` \| `groq` — без ключа по умолчанию `fixture` |
| `GROQ_MODEL` | опц., default `llama-3.3-70b-versatile` |

Оплата API из РФ: зарубежная карта / посредник / RU-модели (позже).

## Позже

`REDIS_URL` / Inngest · `S3_*` / R2 · `YOOKASSA_*` · `RENDER_WORKER_URL` + shared secret · (опц.) Stars provider keys

## Локально

```bash
cp .env.example .env.local
npm run db:migrate          # users/projects/jobs + bot_flows
npm run generate:smoke      # fixture JSON для 3 ниш
npm run test
# tunnel → webhook
```

## Чеклист

- [x] Neon schema + migration в репо (`drizzle/`)
- [x] Blob smoke API
- [x] Bot + webhook handler (`/start` `/new` flow)
- [x] LLM fixture mode + Groq path
- [ ] Preview/Production env (заполнить секреты на Vercel)
- [ ] Live Telegram SMM-тест после env

См. [DEPLOY.md](./DEPLOY.md).
