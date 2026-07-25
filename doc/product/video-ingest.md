# Video ingest и видео на слайдах

Источник: brainstorm — video backgrounds + transitions + audio tracks.

## Универсальная сцена

```
scene = {
  background: color | image(+motion) | video(+trim),
  elements: [...],
  timing: { duration: number | "auto", transition },
}
audio.tracks: music | voiceover | sfx (+ ducking)
```

Один проект → карусель (постеры) / рилс / сторис / реклама.

## Duration auto

| background | duration |
|------------|----------|
| video | `trim.end - trim.start` |
| image | дефолт темы (напр. 3 с) |
| user number | обрезать / loop / freeze last frame |

При upload — **ffprobe**: duration, fps, resolution, orientation → meta ассета.

## Motion для фото

Ken Burns: slow_zoom, pan_left… — «кинематографично» без видео. Обязательная фича тем.

## Переходы

Overlap сцен обязателен в расчёте таймлайна (`Σ durations − Σ overlaps`).  
Remotion: `@remotion/transitions` / TransitionSeries.

Пресеты: crossfade, dip_to_black/white, whip_pan, zoom_punch, blur_through, luma_wipe, glitch, film_burn.  
Тема задаёт дефолт; per-scene override опционален.

## Ingest pipeline

```
Upload (Mini App → presigned S3)
  → ffprobe
  → транскод H.264 CFR   # HEVC/VFR/rotation с iPhone
  → proxy 720p           # preview в браузере
  → poster frame         # PNG-карусель / thumb
  → meta в БД
```

Сток: Pexels/Pixabay API — AI подбирает футаж по тегам сцены.

Лимиты сразу: размер, длительность, форматы, тариф.

## Аудио

Три роли (не свободный DAW): music, voiceover, sfx + звук видео.  
`ducking: true`. Одна функция `getVolume(frame)` для Player и render — иначе превью ≠ экспорт.

## Экономика (с видео)

| | Статика | С видео |
|--|---------|---------|
| Хранение/проект | ~12 МБ | 100–500 МБ |
| Себестоимость | 2–7 ₽ | 10–40 ₽ |

Free: видео-фоны/рилсы жёстко лимитировать или только Pro.  
Очистка исходников free через 30 дней. Очередь с дня 1 MP4.

## UX-запреты

- Не CapCut: переход = иконка между карточками сцен  
- Layouts с флагом `video_friendly` + scrim под текстом  
- Poster: дефолт середина trim + ручной выбор кадра  

## Порядок работ

1. Transitions + timing на статике  
2. Ingest pipeline  
3. Multitrack audio  

Спринты 7–10: [../sprints/SPRINTS.md](../sprints/SPRINTS.md).
