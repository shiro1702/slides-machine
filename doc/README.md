# Документация slides-machine

AI-студия контента: тема → карусель → рилс. MVP — Telegram-бот + Mini App.

## Быстрый старт для Cursor

1. **[project/PROJECT.md](./project/PROJECT.md)** — что строим, стек  
2. **[project/ARCHITECTURE.md](./project/ARCHITECTURE.md)** — JSON-движок слайдов  
3. **[dev/DEPLOY.md](./dev/DEPLOY.md)** · **[dev/ENV_SETUP.md](./dev/ENV_SETUP.md)**  
4. **[sprints/SPRINTS.md](./sprints/SPRINTS.md)** — сейчас **Sprint 2**  
5. **[project/FEATURES.md](./project/FEATURES.md)** — статусы фич  

Брейнштормы: [brainstorms/25.07.2026-INDEX.md](./brainstorms/25.07.2026-INDEX.md) · [styles-themes INDEX](./brainstorms/25.07.2026-styles-themes-INDEX.md).

---

## Структура `doc/`

```
doc/
├── README.md
├── project/           # контекст для кода и AI
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   └── BOT_MESSENGERS.md
├── roadmap/           # продукт (бизнес), не тикеты
├── sprints/           # Sprint 0…12, tasks/
├── dev/               # deploy, env, render
├── marketing/         # positioning, content, telegram, branding
├── business/          # opportunity, models, economics, scaling
├── product/           # slide-engine, layout-styles, slide-types, charts, brand-kits, …
└── brainstorms/       # сырьё + INDEX (не редактировать .md диалогов)
```

---

## Разделение

| Папка | Когда читать |
|-------|--------------|
| **project/** | Перед любой сессией разработки |
| **sprints/** | Ежедневные задачи |
| **dev/** | Деплой и ключи |
| **product/** | Спеки фич вне текущего спринта |
| **roadmap/** | Куда идём продуктом |
| **business/** | Экономика, стоит ли, триггеры |
| **marketing/** | Воронка, контент, бренд |
| **brainstorms/** | Архив; правки только через INDEX → выноски |

`roadmap/` ≠ `sprints/`.

---

## Все файлы

### Разработка

| Файл | |
|------|--|
| [project/PROJECT.md](./project/PROJECT.md) | Сводка + стек |
| [project/ARCHITECTURE.md](./project/ARCHITECTURE.md) | Core, БД, пайплайны |
| [project/FEATURES.md](./project/FEATURES.md) | ⬜ 🔵 ✅ |
| [project/BOT_MESSENGERS.md](./project/BOT_MESSENGERS.md) | TG-first, Stars, MAX |
| [dev/DEPLOY.md](./dev/DEPLOY.md) | Vercel/Neon/worker |
| [dev/ENV_SETUP.md](./dev/ENV_SETUP.md) | Ключи |
| [dev/RENDER.md](./dev/RENDER.md) | Preview vs server render |
| [sprints/SPRINTS.md](./sprints/SPRINTS.md) | План 0–12 |
| [sprints/sprint-2/](./sprints/sprint-2/README.md) | Текущий спринт |

### Продукт и бизнес

| Файл | |
|------|--|
| [roadmap/ROADMAP.md](./roadmap/ROADMAP.md) | Этапы 0–5 |
| [business/opportunity.md](./business/opportunity.md) | Рынок, риски, проверка спроса |
| [business/models.md](./business/models.md) | Тарифы, услуги |
| [business/economics.md](./business/economics.md) | Юнит-экономика |
| [business/scaling.md](./business/scaling.md) | Триггеры |
| [product/slide-engine.md](./product/slide-engine.md) | Layout × theme × type |
| [product/layout-styles.md](./product/layout-styles.md) | Каталог layout-стилей |
| [product/slide-types.md](./product/slide-types.md) | Типы слайдов + паттерны |
| [product/charts.md](./product/charts.md) | Инфографика |
| [product/carousels.md](./product/carousels.md) | PNG MVP |
| [product/video-carousels.md](./product/video-carousels.md) | Сценовые рилсы |
| [product/video-ingest.md](./product/video-ingest.md) | Видео-фоны, audio |
| [product/reels-automation.md](./product/reels-automation.md) | Talking head |
| [product/brand-kits.md](./product/brand-kits.md) | Brand Theme, шрифты |
| [product/prompts.md](./product/prompts.md) | AI-промпты |
| [marketing/positioning.md](./marketing/positioning.md) | Офферы |
| [marketing/content/](./marketing/content/) | Reels + BIP |
| [marketing/telegram/](./marketing/telegram/) | Воронка |
| [marketing/branding.md](./marketing/branding.md) | Нейминг |

### Архив

| Файл | |
|------|--|
| [brainstorms/25.07.2026.md](./brainstorms/25.07.2026.md) | Сырой диалог |
| [brainstorms/25.07.2026-INDEX.md](./brainstorms/25.07.2026-INDEX.md) | Куда вынесено |
| [brainstorms/25.07.2026-styles-themes.md](./brainstorms/25.07.2026-styles-themes.md) | Стили / типы / Brand Theme |
| [brainstorms/25.07.2026-styles-themes-INDEX.md](./brainstorms/25.07.2026-styles-themes-INDEX.md) | Куда вынесено |

---

## Статусы

`FEATURES.md`: ⬜ → 🔵 → ✅.  
`SPRINTS.md` + ретро в `sprint-N/README.md`.
