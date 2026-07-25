# Roadmap (продукт)

Не путать со спринтами: [../sprints/SPRINTS.md](../sprints/SPRINTS.md).

## Направление

```
Статичные карусели
  → Video→carousel / animated MP4
  → Сценовые рилсы (видео на слайдах)
  → Talking-head automation (позже)
  → SaaS для команд
```

Улан-Удэ = пилот. Дистрибуция на RU — с запуска. React Native — только после retention и оплат.

## Этапы

### 0 — Прототип ядра
Схема, стек, скелет бота. Юзеров нет.

### 1 — PNG в Telegram
Тема → JSON → Remotion PNG → media group (путь B). Тест 10–20.  
Вопрос: нужен ли результат?

### 2 — Mini App / веб-редактор
Правки, client ZIP (html-to-image, путь A), «в Telegram» → server, история, лимиты. Бета 30–50.  
Вопрос: сами без помощи? ZIP vs альбом в чат?

### 3 — MP4 из слайдов
Тот же Remotion worker → `renderMedia`. Early pay 50–100.  
Вопрос: инструмент или игрушка?

### 4 — Видео-MVP
Ingest, trim, transitions, audio tracks. 100–300.  
Вопрос: выдерживают сервер/UX/экономика?

### 5 — Публичный запуск
ЮKassa/тарифы, стабильность, лендинг + TG-маркетинг на RU.

## Углы продукта (выбор)

Ниша **или** repurposing **или** agency B2B — см. [../business/opportunity.md](../business/opportunity.md).  
Не «для всех».
