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

function botToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not set");
  }
  return token;
}

type TelegramApiResult<T> = {
  ok: boolean;
  result?: T;
  description?: string;
};

async function telegramApiJson<T>(
  method: string,
  body: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${botToken()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as TelegramApiResult<T>;
  if (!res.ok || !data.ok || data.result === undefined) {
    throw new Error(
      `Telegram ${method} failed: ${data.description ?? res.status}`,
    );
  }
  return data.result;
}

async function telegramApiForm<T>(
  method: string,
  form: FormData,
): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${botToken()}/${method}`, {
    method: "POST",
    body: form,
  });
  const data = (await res.json()) as TelegramApiResult<T>;
  if (!res.ok || !data.ok || data.result === undefined) {
    throw new Error(
      `Telegram ${method} failed: ${data.description ?? res.status}`,
    );
  }
  return data.result;
}

export async function sendTelegramMessage(params: {
  chatId: number;
  text: string;
  replyMarkup?: unknown;
}): Promise<TelegramMessage> {
  return telegramApiJson<TelegramMessage>("sendMessage", {
    chat_id: params.chatId,
    text: params.text,
    reply_markup: params.replyMarkup,
  });
}

export async function editTelegramMessageText(params: {
  chatId: number;
  messageId: number;
  text: string;
  replyMarkup?: unknown;
}): Promise<TelegramMessage | boolean> {
  return telegramApiJson<TelegramMessage | boolean>("editMessageText", {
    chat_id: params.chatId,
    message_id: params.messageId,
    text: params.text,
    reply_markup: params.replyMarkup,
  });
}

export async function deleteTelegramMessage(params: {
  chatId: number;
  messageId: number;
}): Promise<boolean> {
  try {
    return await telegramApiJson<boolean>("deleteMessage", {
      chat_id: params.chatId,
      message_id: params.messageId,
    });
  } catch {
    return false;
  }
}

export async function answerCallbackQuery(params: {
  callbackQueryId: string;
  text?: string;
}): Promise<void> {
  await telegramApiJson("answerCallbackQuery", {
    callback_query_id: params.callbackQueryId,
    text: params.text,
  });
}

/** Telegram media group limit is 10 items. */
export const TELEGRAM_MEDIA_GROUP_LIMIT = 10;

export type MediaGroupPhoto = {
  url: string;
  /** Caption only on the first photo of the whole album send */
  caption?: string;
};

/**
 * Send PNG album via sendMediaGroup. Chunks by 10 when needed.
 * Returns all message ids in order.
 */
export async function sendMediaGroup(params: {
  chatId: number;
  photos: MediaGroupPhoto[];
}): Promise<number[]> {
  if (params.photos.length === 0) {
    throw new Error("sendMediaGroup requires at least one photo");
  }

  const messageIds: number[] = [];

  for (let offset = 0; offset < params.photos.length; offset += TELEGRAM_MEDIA_GROUP_LIMIT) {
    const chunk = params.photos.slice(offset, offset + TELEGRAM_MEDIA_GROUP_LIMIT);
    const media = chunk.map((photo, i) => ({
      type: "photo" as const,
      media: photo.url,
      caption:
        offset === 0 && i === 0 && photo.caption ? photo.caption : undefined,
    }));

    const messages = await telegramApiJson<TelegramMessage[]>("sendMediaGroup", {
      chat_id: params.chatId,
      media,
    });
    for (const msg of messages) {
      messageIds.push(msg.message_id);
    }
  }

  return messageIds;
}

/**
 * Fallback when public Blob URLs are blocked: upload bytes as multipart attach://
 */
export async function sendMediaGroupFromBuffers(params: {
  chatId: number;
  photos: Array<{ filename: string; bytes: Buffer; caption?: string }>;
}): Promise<number[]> {
  if (params.photos.length === 0) {
    throw new Error("sendMediaGroupFromBuffers requires at least one photo");
  }

  const messageIds: number[] = [];

  for (
    let offset = 0;
    offset < params.photos.length;
    offset += TELEGRAM_MEDIA_GROUP_LIMIT
  ) {
    const chunk = params.photos.slice(
      offset,
      offset + TELEGRAM_MEDIA_GROUP_LIMIT,
    );
    const form = new FormData();
    form.append("chat_id", String(params.chatId));

    const media = chunk.map((photo, i) => {
      const attachName = `file${i}`;
      form.append(
        attachName,
        new Blob([new Uint8Array(photo.bytes)], { type: "image/png" }),
        photo.filename,
      );
      return {
        type: "photo" as const,
        media: `attach://${attachName}`,
        caption:
          offset === 0 && i === 0 && photo.caption ? photo.caption : undefined,
      };
    });
    form.append("media", JSON.stringify(media));

    const messages = await telegramApiForm<TelegramMessage[]>(
      "sendMediaGroup",
      form,
    );
    for (const msg of messages) {
      messageIds.push(msg.message_id);
    }
  }

  return messageIds;
}

export { startReplyMarkup } from "./keyboards";
