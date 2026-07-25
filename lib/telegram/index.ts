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

export type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
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

export async function sendTelegramMessage(params: {
  chatId: number;
  text: string;
  replyMarkup?: unknown;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: params.chatId,
      text: params.text,
      reply_markup: params.replyMarkup,
    }),
  });

  if (!res.ok) {
    // Do not log response body — may contain chat metadata
    throw new Error(`Telegram sendMessage failed with status ${res.status}`);
  }
}

export function startReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "Сделать карусель", callback_data: "new_carousel" }],
      [
        { text: "Примеры", callback_data: "examples" },
        { text: "Как это работает", callback_data: "how_it_works" },
      ],
    ],
  };
}
