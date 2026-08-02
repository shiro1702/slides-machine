# Sprint 1 — shared slides + веб-редактор + client ZIP *(путь A)*

**Статус:** запланирован · **Тест:** внутренний smoke (desktop + iPhone/Safari)  
**Источник:** [hybrid-render brainstorm](../../brainstorms/25.07.2026-hybrid-render-INDEX.md) · [RENDER.md](../../dev/RENDER.md) · [editor-flow.md](../../product/editor-flow.md)

## Цель

Один набор чистых React-слайдов + signed веб-редактор `/e/{id}` + клиентский ZIP через html-to-image — без серверного Remotion и без Brand Theme UI.

**Roadmap:** [этап 2 — редактор / путь A](../../roadmap/ROADMAP.md#2--mini-app--веб-редактор) · **Фичи:** часть F2.1 (signed link), F2.2 (текст/порядок), F2.4a

## Зависимости

- Фундамент бот→JSON готов: [sprint-1-bot-json](../sprint-1-bot-json/README.md) (F1.1–F1.2).
- Layouts из Sprint 2 (`remotion/layouts`) — дисциплина pure React; выделить/зафиксировать shared API.
- Neon project JSON читается по `users.id`.

> **Хронология:** код Sprint 2 (путь B album) уже есть. По hybrid-плану путь A — Sprint 1; реализуем его следующим, не дублируя Remotion.

## Чеклист

- [ ] Shared slides: pure React, Remotion-compatible, шрифты файлами ([task 01](./tasks/01-shared-slides.md))
- [ ] Signed editor `/e/{projectId}?t=` + кнопка из бота ([task 02](./tasks/02-signed-editor.md))
- [ ] Preview + правки текста/порядка + Zod save ([task 03](./tasks/03-preview-edit.md))
- [ ] Client ZIP: html-to-image + JSZip, событие `exported` ([task 04](./tasks/04-client-zip.md))
- [ ] Smoke: fixture → ZIP на desktop и iPhone/Safari ([task 05](./tasks/05-smoke.md))

## Критерии выхода

- [ ] Один и тот же project JSON даёт визуально согласованный preview и client PNG
- [ ] Владелец открывает `/e/{id}` по signed JWT; чужой/просроченный токен отклоняется
- [ ] Правки текста/порядка сохраняются через Zod; битый JSON не пишется
- [ ] «Скачать ZIP» собирает все слайды последовательно после `document.fonts.ready`
- [ ] Smoke на iPhone/Safari: ZIP скачивается без tainted canvas / blank frames
- [ ] Telemetry: `exported` отдельно от server `delivered` (Sprint 2)

## Метрики

- Доля проектов с открытием editor после JSON
- Доля `exported` (client ZIP) vs отказ/ошибка
- p50 времени client ZIP на 5–7 слайдах (desktop / iOS)

## Не входит

Remotion worker / album (Sprint 2), Playwright, Mini App `initData` (Sprint 4), watermark, upload фото, Brand Theme picker, Soft Pastel / charts, MP4, второй мессенджер.

## Ретро

_(шрифты/CORS/iOS · хватает ли signed link без Mini App · вход в S4 Brand Theme)_
