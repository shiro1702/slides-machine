export type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

export type TelegramChat = {
  id: number;
  type: string;
};

export type TelegramMessage = {
  message_id: number;
  date: number;
  chat: TelegramChat;
  from?: TelegramUser;
  text?: string;
};

export type TelegramCallbackQuery = {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
  chat_instance?: string;
};

export type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
};

export function verifyWebhookSecret(
  headerValue: string | null,
  expected = process.env.TELEGRAM_WEBHOOK_SECRET,
): boolean {
  if (!expected) {
    return false;
  }
  return headerValue === expected;
}

async function telegramApi(
  method: string,
  body: Record<string, unknown>,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Telegram ${method} failed with status ${res.status}`);
  }
}

export async function sendTelegramMessage(params: {
  chatId: number;
  text: string;
  replyMarkup?: unknown;
}): Promise<void> {
  await telegramApi("sendMessage", {
    chat_id: params.chatId,
    text: params.text,
    reply_markup: params.replyMarkup,
  });
}

export async function answerCallbackQuery(params: {
  callbackQueryId: string;
  text?: string;
}): Promise<void> {
  await telegramApi("answerCallbackQuery", {
    callback_query_id: params.callbackQueryId,
    text: params.text,
  });
}

export { startReplyMarkup } from "./keyboards";
