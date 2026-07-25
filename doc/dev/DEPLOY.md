# Деплой

Источник: brainstorm (Vercel/Neon Free, worker sizing).

## Схема

```
Telegram / Browser
       ↓
Next.js (Vercel)      — UI, API, webhook, create job
       ↓
Neon Postgres         — users, projects, JSON, jobs
       ↓
Vercel Blob / S3      — PNG, MP4, исходники, proxy
       ↓
VPS render worker     — Remotion, FFmpeg (с MP4)
       ↓
Signed URL / TG send
```

## Сейчас (Sprint 0–2, PNG)

1. Vercel Free/Hobby — web, API, TG webhook  
2. Neon Free — users/projects/jobs  
3. Vercel Blob (+ CORS для client html-to-image)  
4. **Remotion worker** для `renderStill` — с Sprint 2: отдельный процесс (Railway/Fly/VPS $5–10) или временно layout-backend на Vercel **только** пока закрытый тест; целевой путь — worker + Remotion  

PNG без мощного GPU. Очередь jobs в Neon — сразу.

## Render worker (Remotion)

Не Vercel Functions (Chrome + лимиты времени/размера).

| Этап | Worker |
|------|--------|
| PNG album (S2+) | 1× VPS/Railway 2–4 vCPU, poll `render_jobs` |
| MP4 рилсы (S6+) | 4–8 vCPU / 16 GB NVMe; 1 тяжёлый MP4 за раз |
| Очередь растёт | горизонтальные workers или `@remotion/lambda` |

Лицензия Remotion: бесплатно ≤3 человека; company seats — строка в [economics](../business/economics.md).

**Не используем Playwright** как основной PNG-движок (см. [RENDER.md](./RENDER.md) Strategy B).

## Когда нужен «толстый» VPS

MP4, FFmpeg, video ingest, proxy — с этапа рилсов.

## Vercel Free — хватит / не хватит

**Хватит:** лендинг, Mini App, API, webhook, JSON-проекты, закрытая альфа.  

**Не хватит:** Remotion/FFmpeg, долгие задачи, большие upload, стабильный коммерческий прод без лимитов.

Hobby — осторожно с коммерцией; при деньгах → Pro или свой VPS.

**Не отдавать MP4 через Vercel bandwidth** — только signed URL из storage.

## Neon Free

Хватит для users/projects/jobs. Cold start 1–3 с — ок для прототипа.  
Бинарники не хранить. Paid — когда база активна весь день и есть клиенты.

## RF

План миграции на RU-хостинг (Timeweb / Selectel / Yandex) при ограничениях платформ.

## Чеклист первого деплоя

- [ ] Vercel linked  
- [ ] `DATABASE_URL` Production + Preview  
- [ ] Blob  
- [ ] Telegram webhook на prod  
- [ ] Smoke: /start → ответ  

См. [ENV_SETUP.md](./ENV_SETUP.md), [RENDER.md](./RENDER.md).
