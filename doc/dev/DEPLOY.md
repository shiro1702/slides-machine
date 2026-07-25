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

## Сейчас (Sprint 0–2, только PNG)

1. Vercel Free/Hobby — ок для закрытого теста  
2. Neon Free — метаданные  
3. Vercel Blob  
4. Telegram webhook → Vercel  

PNG можно временно без отдельного мощного worker; архитектуру job+storage заложить сразу.

## Когда нужен VPS worker

MP4, Remotion render, FFmpeg, proxy, video ingest.

### Рекомендуемые размеры

| Этап | App | Worker |
|------|-----|--------|
| Спрос (PNG) | 1 VPS 4 vCPU/8 GB **или** Vercel + лёгкий render | опционально |
| Платящие + MP4 | 4 vCPU / 8 GB | **8 vCPU / 16 GB**, 150–200 GB NVMe |
| Рост | то же | горизонтальные workers + Redis queue |

GPU не нужна на старте.  
1 тяжёлый MP4 одновременно на одном worker.

Storage: S3-compatible от ~100 GB + автоочистка (free-юзеры: исходники через 30 дней).

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
