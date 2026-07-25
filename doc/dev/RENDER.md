# Рендер: браузер vs сервер

Источник: brainstorm 25.07.2026.

## Правило

| Задача | Где |
|--------|-----|
| Редактор + preview анимаций | Браузер (React / Remotion Player) |
| Финальный PNG/JPEG | **Сервер** (стабильность, шрифты, Safari) |
| Финальный MP4 | **VPS worker** (Remotion + Chromium + FFmpeg) |

## Клиентский MP4 — не основной путь

Возможно через MediaRecorder / WebCodecs / ffmpeg.wasm, но:

- iOS Safari капризен (кодеки, память, фон);
- часто WebM вместо MP4;
- тяжёлый UX на телефоне.

Remotion Player в браузере — **да**. Remotion render MP4 в браузере — **нет** как основной путь.

## PNG на клиенте

html-to-image / canvas — ок для прототипа; для продакшена лучше сервер (одинаковый результат у всех, кастомные шрифты).

## Remotion как единый rendering layer

```
carousel.json → Remotion → PNG slides
carousel.json → Remotion → MP4 (animated)
edit.json     → Remotion → MP4 (talking head, позже)
```

Альтернатива только для статики: satori / playwright — быстрее, но ломает единую дизайн-систему со видео. **Решение:** слайды на React/Remotion-компонентах с первого дня.

## Очередь

Даже для PNG:

```
generate_content → render_carousel → send_to_telegram
```

Webhook не ждёт рендер. MP4: 1–3 мин CPU — очередь обязательна до публичного видео.
