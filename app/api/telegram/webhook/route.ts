import { NextRequest, NextResponse } from "next/server";
import {
  sendTelegramMessage,
  startReplyMarkup,
  verifyWebhookSecret,
  type TelegramUpdate,
} from "@/lib/telegram";
import { hasDatabaseUrl } from "@/lib/db";
import { upsertTelegramUser } from "@/lib/telegram/users";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-telegram-bot-api-secret-token");
  if (!verifyWebhookSecret(secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TelegramUpdate;
  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const message = update.message;
  const text = message?.text?.trim() ?? "";
  const chatId = message?.chat?.id;
  const fromId = message?.from?.id;

  if (!message || chatId == null) {
    return NextResponse.json({ ok: true });
  }

  if (text.startsWith("/start")) {
    if (fromId != null && hasDatabaseUrl()) {
      try {
        await upsertTelegramUser(String(fromId));
      } catch {
        // DB is optional for /start reply; do not leak details
        console.error("telegram user upsert failed");
      }
    }

    try {
      await sendTelegramMessage({
        chatId,
        text:
          "Привет! Я slides-machine — тема → карусель → рилс.\n\n" +
          "Sprint 0: бот онлайн. Скоро: /new → карусель.",
        replyMarkup: startReplyMarkup(),
      });
    } catch {
      console.error("telegram sendMessage failed");
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
