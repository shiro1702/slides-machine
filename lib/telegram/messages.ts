import type { GenerationErrorCode } from "@/lib/ai/errors";

export const MSG = {
  start:
    "Привет! Я slides-machine — тема → карусель для Telegram / VK / Instagram*.\n\n" +
    "Примеры тем: «5 ошибок в прогреве», «Чеклист риелтора перед показом», «Контент-план на неделю».\n\n" +
    "Выбери действие ниже или /new.",

  howItWorks:
    "1) Выбери нишу\n2) Напиши тему\n3) Выбери стиль\n4) Получишь структуру карусели (JSON)\n\n" +
    "PNG-рендер — в следующем спринте. Команды: /new · /cancel",

  examples:
    "Примеры тем:\n" +
    "• Эксперты: «3 мифа о личном бренде»\n" +
    "• Недвижимость: «Что проверить перед задатком»\n" +
    "• SMM: «Чеклист карусели за 15 минут»",

  pickNiche: "Выбери нишу:",

  askTopic:
    "Ок. Напиши тему карусели одним сообщением (можно на русском).",

  pickStyle: "Выбери визуальный стиль:",

  confirm: (topic: string, nicheLabel: string, styleLabel: string) =>
    `Готово к генерации:\n• Ниша: ${nicheLabel}\n• Тема: ${topic}\n• Стиль: ${styleLabel}\n\nЗапускаем?`,

  generating: "Генерирую структуру… Это займёт несколько секунд.",

  success: (title: string, projectId: string) =>
    `Готово! Проект сохранён.\n\n«${title}»\nID: ${projectId}\n\nРендер PNG появится в следующем спринте. /new — ещё одна карусель.`,

  cancelled: "Ок, отменил. /new — начать заново.",

  expired: "Сессия устарела. Начни заново: /new",

  needRestart: "Нет активного flow. Начни с /new",

  topicTooShort: "Тема слишком короткая. Напиши хотя бы 3 символа.",

  topicTooLong: "Тема слишком длинная (макс. 500 символов). Сократи.",
} as const;

export function errorUserMessage(code: GenerationErrorCode): string {
  switch (code) {
    case "provider_error":
      return "Сервис генерации временно недоступен. Попробуй ещё раз.";
    case "invalid_json":
    case "schema_mismatch":
      return "Не удалось собрать валидную структуру. Можно повторить или начать новый проект.";
    case "timeout":
      return "Генерация слишком долго отвечает. Попробуй ещё раз.";
    default:
      return "Что-то пошло не так. Попробуй ещё раз или начни новый проект.";
  }
}
