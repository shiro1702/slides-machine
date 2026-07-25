# Editor flow: бот → веб → экспорт

Источник: [hybrid-render brainstorm](../brainstorms/25.07.2026-hybrid-render-INDEX.md).

## Пользовательский флоу

```
1. Бот: тема / текст → AI → project JSON (Neon)
2. «Готово → Открыть редактор» (Mini App или signed link)
3. Веб: preview, правки текста / порядка / темы / картинок
4. Экспорт:
   A) Скачать ZIP (html-to-image на клиенте)
   B) Отправить в мессенджер (Remotion renderStill → альбом)
```

Бот-only shortcut (без редактора): сразу путь B — для быстрых тестеров и Pro.

## Auth без регистрации

| Вход | Как |
|------|-----|
| Telegram Mini App | `initData` → `users.id` |
| Signed link | `/e/{projectId}?t={jwt}` · JWT `{ userId, projectId, exp }` или one-time session |
| Десктоп | та же ссылка из бота (удобнее править) |

Веб авторизует по **`users.id`**, не по «Telegram Login» как единственному пути — иначе второй мессенджер сломает редактор. См. [BOT_MESSENGERS.md](../project/BOT_MESSENGERS.md).

## Состояния проекта

| status | Смысл |
|--------|--------|
| `draft` | итерация текста в боте |
| `generated` | JSON слайдов готов |
| `editing` | открыт веб-редактор, правки пишутся (версии) |
| `exported` | клиент скачал ZIP (событие аналитики) |
| `rendering` | серверный job в очереди/процессе |
| `delivered` | адаптер отправил альбом/видео |

Источник правды — **JSON** (+ versions). Картинки всегда можно перерендерить.

## Картинки пользователя

**В вебе (приоритет):** drag&drop → Vercel Blob **client upload** → URL в JSON слайда.  
Кроп MVP: `object-fit` + `object-position` («подвинуть фото»).  

**В боте:** photo message → adapter скачивает → Blob → наш URL в Core — **итерация 2**, не блокер редактора.

CORS на Blob обязателен для пути A (html-to-image).

## Что править в каком клиенте

| Действие | Бот | Веб-редактор |
|----------|-----|--------------|
| Тема / стиль / вариант текста | ✓ | ✓ |
| Порядок / add-delete слайдов | слабо | ✓ |
| Загрузка/кроп фото | позже | ✓ |
| ZIP себе | ссылка на веб | ✓ путь A |
| Альбом в чат | ✓ путь B | кнопка «в мессенджер» → B |

## События аналитики

`exported` (client ZIP) · `rendering` · `delivered` (server album) — раздельно.  
Free может жить на `exported`; Pro ценит `delivered`.

См. [RENDER.md](../dev/RENDER.md) · [carousels.md](./carousels.md).
