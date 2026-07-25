# slides-machine — сводка проекта

> Контекст для Cursor. Обновляй при смене стека или ядра.  
> Источник идей: [../brainstorms/25.07.2026-INDEX.md](../brainstorms/25.07.2026-INDEX.md).

## Что строим

**slides-machine** — AI-студия контента (рабочее имя репо; бренд уточняется — см. [../marketing/branding.md](../marketing/branding.md)):

> Тема → карусель → рилс. Без Canva, без дизайнера, без долгих промптов.  
> Канал MVP: **Telegram-бот + Mini App** (тот же веб-редактор).

### Ценность MVP

1. Тема в боте → AI → JSON карусели  
2. PNG-рендер → media group в Telegram  
3. Mini App: правки текста/порядка → повторный экспорт  
4. Позже: тот же проект → MP4 (рилс из слайдов)

Дифференциатор на этапе 3–4: конкуренты каруселей редко умеют **тот же слайд → видео**.

## Аудитория (старт)

1. SMM / контент-менеджеры  
2. Эксперты / коучи / консультанты  
3. Риелторы (нишевый пилот)

Пилот: **Улан-Удэ** → **вся RU** (TG, VK). Улан-Удэ — полигон, не рынок.

## Стек (зафиксировано)

| Слой | Выбор | Почему |
|------|--------|--------|
| App | **Next.js** на Vercel | Remotion = только React; Nuxt отпадает |
| UI | Tailwind + shadcn/ui | скорость |
| БД | **Neon** Postgres | Free на прототип |
| Файлы | **Vercel Blob** → позже R2/S3 | старт без отдельного S3 |
| AI | Groq / OpenRouter / DeepSeek | structured JSON |
| Preview | Remotion Player / HTML preview | в браузере и Mini App |
| PNG/MP4 render | сервер / **VPS worker** | не Serverless для MP4 |
| Bot | Telegram Bot API + Mini App | bot-first MVP |
| Платежи | ЮKassa на сайте; Stars внутри TG — отдельно | см. BOT_MESSENGERS |

### Архитектурное правило

- Vercel = UI, API, webhook, create job  
- Neon = метаданные + JSON (не бинарники)  
- Blob/S3 = PNG, MP4, исходники  
- Worker = Remotion + FFmpeg  

Подробнее: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Форматы

| Формат | Когда |
|--------|--------|
| 1080×1350 (4:5) | MVP карусели (приоритет) |
| 1080×1080 | MVP |
| 1080×1920 | рилсы / stories |

## Этапы (кратко)

| # | Суть | Тест |
|---|------|------|
| 0 | Схема, стек, скелет бота | нет |
| 1–2 | PNG в Telegram | 10–20 |
| 4 | Mini App-редактор | 30–50 |
| 6 | MP4 из слайдов | early pay 50–100 |
| 7–10 | видео-фоны, transitions, audio | видео-MVP |
| 11–12 | платежи, публичный запуск | — |

## Что не в MVP

Сложный timeline, полный brand kit, команды, MAX, React Native, talking-head дубли/B-roll, маркетплейс шаблонов.

## Связанные документы

- [FEATURES.md](./FEATURES.md) · [BOT_MESSENGERS.md](./BOT_MESSENGERS.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)  
- [../sprints/SPRINTS.md](../sprints/SPRINTS.md) · [../dev/ENV_SETUP.md](../dev/ENV_SETUP.md)
