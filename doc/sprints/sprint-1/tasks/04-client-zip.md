# 04 — Client ZIP (путь A)

Экспорт карусели в браузере: html-to-image → JSZip → download.

**Фича:** F2.4a · **Зависимости:** tasks 01, 03

## Scope

- Слайды в DOM 1080×1350 (на экране `transform: scale`)
- `await document.fonts.ready` перед рендером
- Последовательный `toPng` + прогресс («3 из 7») — не `Promise.all` на мобилках
- Offscreen: `left: -9999`, не `display: none`
- JSZip → `saveAs` / download
- Analytics: событие `exported` (отдельно от server `delivered`)
- Watermark — **не** в этом спринте (S5/S11)

## Done when

- [ ] ZIP содержит PNG всех слайдов в правильном порядке
- [ ] На desktop ZIP визуально близок к preview
- [ ] CORS/tainted canvas не ломает экспорт (нет внешних картинок без CORS или они bypassed)
- [ ] `exported` логируется без утечки полного пользовательского текста/секретов

## Связанные документы

- [RENDER.md — Путь A](../../../dev/RENDER.md)
- [editor-flow.md](../../../product/editor-flow.md)
- [models.md — Free = client ZIP](../../../business/models.md)
