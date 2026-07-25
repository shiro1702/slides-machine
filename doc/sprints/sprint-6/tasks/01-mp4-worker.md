# 01 — MP4 worker

**Фича:** F3.1

## Scope

- Отдельный worker (VPS) с Remotion + Chromium
- Queue job type `render_reel` / `render_mp4`
- Blob storage для mp4, retries, таймауты

## Done when

- [ ] Job не блокирует PNG queue каруселей
- [ ] Ошибка одного MP4 не роняет worker
