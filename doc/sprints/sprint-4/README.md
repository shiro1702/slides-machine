# Sprint 4 — редактор + клиентский экспорт (путь A)

**Статус:** запланирован · **Тест №2:** 30–50 / 7 дней  
**Источник:** [hybrid-render](../../brainstorms/25.07.2026-hybrid-render-INDEX.md) · [editor-flow](../../product/editor-flow.md)

## Цель

Веб/Mini App редактор на **тех же** slide-компонентах + дешёвый ZIP на клиенте + опциональная отправка альбома в чат (путь B).

**Фичи:** F2.1–F2.4 · **F2.9a** client ZIP · upload фото

## Чеклист (укрупнённо)

- [ ] Mini App / `/e/{id}` + auth (`initData` и/или signed JWT)
- [ ] Preview + edit текст / порядок / add-delete / стиль
- [ ] **Путь A:** html-to-image → JSZip (fonts.ready, CORS, sequential, iOS test)
- [ ] Кнопка «Отправить в Telegram» → существующий Remotion job (путь B)
- [ ] Upload изображения → Blob client upload → URL в JSON
- [ ] События `exported` vs `delivered`
- [ ] Тест №2: activation, ZIP vs album preference

## Критерии выхода

- [ ] Правки → ZIP без помощи команды
- [ ] Визуал ZIP ≈ album (shared components; допустимы мелкие отличия эмодзи)
- [ ] Слабый iPhone не падает на 5–7 слайдах (прогресс / fallback «отправьте в Telegram»)
- [ ] Чужой token/project недоступен

## Не входит

WA адаптер, MP4, полный Brand Kit, drag stickers Canva.

## Ретро

_(нужен ли Pro ради «альбом в чат» · watermark Free)_
