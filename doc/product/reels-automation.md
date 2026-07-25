# Reels automation (talking head)

После каруселей и сценовых рилсов. Источник: ранняя часть brainstorm (Remotion pipeline).

## Когда

Не блокирует MVP. Конкурируем с OpusClip/Captions — высокая сложность.  
Идём сюда после доказанных каруселей + MP4 из слайдов.

## Архитектура

```
Markdown script.md
        ↓
Content parser → structured script
        ↓
Whisper transcript (cloud или local faster-whisper)
        ↓
AI → edit.json   ← центральный формат
        ↓
Remotion templates → MP4 (+ srt, cover, description)
```

Опционально **локальный агент** (Node CLI): сканирование папки, ffmpeg, proxy, тяжёлый рендер — гибрид с облачным dashboard.

## MVP talking-head (если дойдём)

Ручной файл + TalkingHeadReel: blur bg, title, captions, B-roll, sticker, music.  
Без авто-выбора дублей.

v2: паузы, поиск сцен, .ass субтитры.  
v3: мультикамера, лучший дубль, QC, batch.

## Заготовки заранее

- Brand style (цвета, субтитры, CTA)  
- Шаблоны: expert_tips, problem_solution, storytelling…  
- Ассеты: fonts, stickers, music, sfx  
- Правила съёмки («Дубль 1. Хук») + нейминг файлов + broll tags  

Промпты: [prompts.md](./prompts.md).

## MCP

Не центр SaaS. Обычный API проектов; MCP — для локального агента / Claude Desktop.
