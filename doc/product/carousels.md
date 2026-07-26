# Статичные карусели

Ядро MVP. Источник: brainstorm 25.07.2026.

## Пайплайн

```
Тема / Markdown / заметка
        ↓
LLM → structured carousel.json
        ↓
Zod validation
        ↓
Layout Style × Brand Theme × Slide types
        ↓
Render PNG (сервер)
        ↓
TG media group / ZIP / Mini App
```

## MVP-функции

- Карусель из темы  
- Из текста / Markdown  
- Выбор шаблона / стиля  
- Базовые бренд-цвета  
- Экспорт: **альбом в мессенджер** (Remotion) и/или **ZIP** (S3 из Blob; S4 — html-to-image на клиенте)  
- Caption + hashtags (опц.)  

Гибридный флоу: [editor-flow.md](./editor-flow.md) · [RENDER.md](../dev/RENDER.md).

## Форматы

Приоритет MVP: **1080×1350**. Также 1080×1080; 1080×1920 — для рилсов.

## iOS / сохранение

Идеальный flow: сайт/бот → generate → preview → правки → export → Photos → публикация.

На MVP: **Download each slide + ZIP**. Web Share API — тестировать. Нативное «Save all» — позже (app).

Live Photos на старте не поддерживать. HEIC: конвертация на сервере при появлении upload картинок.

## Метрика качества

**Time to first usable carousel** ≤ 2–3 мин от /start.  
Главный сигнал спроса: опубликовали без переделок + вернулись за второй партией.

## Video → Carousel (следующий сильный кусок)

Сначала: вставить **текстовую расшифровку** → карусель.  
Потом: короткое видео ≤ 3 мин.  
Потом: длинные через worker.  
См. [video-ingest.md](./video-ingest.md).

## Шаблоны и layouts

[slide-engine.md](./slide-engine.md) · [layout-styles.md](./layout-styles.md) · [slide-types.md](./slide-types.md) · [brand-kits.md](./brand-kits.md)
