# 05 — Smoke: fixture → ZIP

Проверить путь A end-to-end без серверного Remotion.

**Зависимости:** tasks 01–04

## Scope

- Fixture project (3 ниши / существующие fixtures) → signed editor → ZIP
- Desktop (Chrome/Safari) + iPhone/Safari
- Двойной `toPng` (прогрев) на iOS при необходимости
- Зафиксировать баги: blank frames, шрифты, память, порядок файлов

## Done when

- [ ] Хотя бы один fixture → ZIP на desktop
- [ ] Хотя бы один fixture → ZIP на iPhone/Safari (или явный блокер в ретро)
- [ ] Чеклист подводных камней RENDER.md пройден или заведён follow-up
- [ ] Нет зависимости от `render_carousel` worker для этого smoke

## Связанные документы

- [RENDER.md — подводные камни](../../../dev/RENDER.md)
- [sprint-1 README](../README.md)
