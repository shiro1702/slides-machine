# 01 — JSON-схема проекта

Зафиксировать каноническую схему (Zod), независимую от Remotion.

**Фичи:** F0.1, F0.6 · **Зависимости:** нет

## Scope

- `project`: id, type, title, status, themeId, templateId, format  
- `scenes[]`: id, layout, elements[], background  
- `elements`: type, content, x/y/w/h/zIndex  
- `theme` tokens  
- `export_settings`  
- Поля `timing` / `animation` / `audio` — **заложить сразу**, даже если PNG игнор  
- Форматы: `square` = 1080×1080, `portrait` = 1080×1350, `story` = 1080×1920

## Не входит

Remotion-композиции, PNG/MP4 render и полный набор будущих типов элементов.

## Done when

- [x] Схема находится в `packages/schemas` или `lib/schemas`
- [x] Размеры вычисляются из enum формата, а не принимаются произвольными числами
- [x] Fixture карусели Mistakes успешно валидируется во всех трёх форматах
- [x] Невалидные layout, format и element type отклоняются Zod
- [x] Поля для будущего видео опциональны и не мешают PNG-проекту
- [x] На схему добавлена ссылка из [ARCHITECTURE.md](../../../project/ARCHITECTURE.md)

## Связанные документы

- [Slide rendering engine](../../../product/slide-engine.md)
- [Архитектура](../../../project/ARCHITECTURE.md)
