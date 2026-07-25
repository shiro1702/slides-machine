# Funnel summary checklist (Sprint 2)

После закрытого теста собери из platform logs строки `type":"telemetry"`.

## Метрики

1. **Time to album (p50 / p90)**  
   Для каждого `correlationId`:  
   `delivery_succeeded.ts − flow_started.ts` (или сумма `latencyMs` gen+render+delivery).

2. **Доля usable ≤ 3 минут**  
   `count(total_time ≤ 180s & delivery_succeeded) / count(started)`.

3. **Drop-off**  
   Доля остановок на niche / topic / style / generation_failed / render_failed / delivery_failed.

4. **Надёжность**  
   `delivery_skipped_idempotent` не должна расти вместе с дублями album в чате.

## Быстрый grep

```bash
# пример: выгрузка логов Vercel → file.jsonl
rg '"event":"(flow_started|generation_succeeded|render_succeeded|delivery_succeeded)"' logs.jsonl
```

Ручная таблица участников — в [test-script.md](./test-script.md).
