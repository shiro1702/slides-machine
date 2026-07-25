# 01 — JSON-схема проекта

Зафиксировать каноническую схему (Zod), независимую от Remotion.

## Must have

- `project`: id, type, title, status, themeId, templateId, format  
- `scenes[]`: id, layout, elements[], background  
- `elements`: type, content, x/y/w/h/zIndex  
- `theme` tokens  
- `export_settings`  
- Поля `timing` / `animation` / `audio` — **заложить сразу**, даже если PNG игнор  

## Done when

- Схема в `packages/schemas` или `lib/schemas`  
- Пример fixture JSON на 1 карусель Mistakes  
- Ссылка из [../../project/ARCHITECTURE.md](../../project/ARCHITECTURE.md)
