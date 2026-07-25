# Env setup

Секреты не коммитить.

## Sprint 0

| Переменная | Где | Зачем |
|------------|-----|--------|
| `DATABASE_URL` | Neon Console | Postgres |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Файлы |
| `TELEGRAM_BOT_TOKEN` | BotFather | Бот |
| `TELEGRAM_WEBHOOK_SECRET` | сгенерировать | Verify webhook |

## Sprint 1+

| | |
|--|--|
| `GROQ_API_KEY` / `OPENROUTER_API_KEY` / `DEEPSEEK_API_KEY` | structured JSON |
| Оплата API из РФ | зарубежная карта / посредник / RU-модели |

## Позже

`REDIS_URL` / Inngest · `S3_*` / R2 · `YOOKASSA_*` · `RENDER_WORKER_URL` + shared secret · (опц.) Stars provider keys

## Локально

```bash
cp .env.example .env.local   # когда появится
# tunnel → webhook
```

## Чеклист

- [x] Neon schema + migration в репо (`drizzle/`)
- [x] Blob smoke API
- [x] Bot + webhook handler
- [ ] Preview/Production env (заполнить секреты на Vercel)

См. [DEPLOY.md](./DEPLOY.md).
