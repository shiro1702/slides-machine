import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import {
  answerCallbackQuery,
  sendTelegramMessage,
  verifyWebhookSecret,
  type TelegramUpdate,
} from "@/lib/telegram";
import { parseCallbackData } from "@/lib/telegram/callbacks";
import {
  confirmReplyMarkup,
  errorReplyMarkup,
  nicheReplyMarkup,
  startReplyMarkup,
  styleReplyMarkup,
} from "@/lib/telegram/keyboards";
import { errorUserMessage, MSG } from "@/lib/telegram/messages";
import { getFlow, resetFlow, upsertFlow } from "@/lib/telegram/flow-store";
import { getDb, hasDatabaseUrl } from "@/lib/db";
import { jobs, projects } from "@/lib/db/schema";
import { upsertTelegramUser } from "@/lib/telegram/users";
import { claimTelegramUpdate } from "@/lib/projects/create-from-flow";
import { runCarouselGeneration } from "@/lib/projects/run-generation";
import { kickJobWorker } from "@/lib/jobs";
import { getNiche, getStyle } from "@/lib/meta";
import {
  hashTelegramId,
  logEvent,
  newCorrelationId,
} from "@/lib/telemetry/logEvent";

export const runtime = "nodejs";
export const maxDuration = 60;

const TOPIC_MIN = 3;
const TOPIC_MAX = 500;

async function safeSend(params: {
  chatId: number;
  text: string;
  replyMarkup?: unknown;
}) {
  try {
    return await sendTelegramMessage(params);
  } catch {
    console.error("telegram sendMessage failed");
    return null;
  }
}

async function safeAnswer(callbackQueryId: string, text?: string) {
  try {
    await answerCallbackQuery({ callbackQueryId, text });
  } catch {
    console.error("telegram answerCallbackQuery failed");
  }
}

async function beginNewFlow(params: {
  telegramId: string;
  chatId: number;
}) {
  const correlationId = newCorrelationId();
  await upsertTelegramUser(params.telegramId);
  await upsertFlow({
    telegramId: params.telegramId,
    step: "await_niche",
    data: { correlationId },
  });
  logEvent("flow_started", {
    correlationId,
    telegramIdHash: hashTelegramId(params.telegramId),
  });
  await safeSend({
    chatId: params.chatId,
    text: MSG.pickNiche,
    replyMarkup: nicheReplyMarkup(),
  });
}

async function runGenerationAndReply(params: {
  telegramId: string;
  chatId: number;
  nicheId: string;
  topic: string;
  styleId: string;
  correlationId: string;
  generationRequestId?: string;
  existingProjectId?: string;
}) {
  await upsertFlow({
    telegramId: params.telegramId,
    step: "generating",
    data: {
      nicheId: params.nicheId,
      topic: params.topic,
      styleId: params.styleId,
      correlationId: params.correlationId,
      generationRequestId: params.generationRequestId,
      projectId: params.existingProjectId,
    },
    mergeData: true,
  });

  await safeSend({ chatId: params.chatId, text: MSG.generating });

  const result = await runCarouselGeneration({
    telegramId: params.telegramId,
    nicheId: params.nicheId,
    topic: params.topic,
    styleId: params.styleId,
    correlationId: params.correlationId,
    generationRequestId: params.generationRequestId,
    existingProjectId: params.existingProjectId,
    chatId: params.chatId,
  });

  if (result.ok) {
    const progress = await safeSend({
      chatId: params.chatId,
      text: MSG.rendering,
    });

    await upsertFlow({
      telegramId: params.telegramId,
      step: "done",
      data: {
        nicheId: params.nicheId,
        topic: params.topic,
        styleId: params.styleId,
        correlationId: result.correlationId,
        projectId: result.projectId,
        chatId: params.chatId,
        progressMessageId: progress?.message_id,
      },
    });

    // Patch delivery context onto project + render job, then ensure worker runs
    if (progress?.message_id) {
      const db = getDb();
      const rows = await db
        .select()
        .from(projects)
        .where(eq(projects.id, result.projectId))
        .limit(1);
      const row = rows[0];
      if (row) {
        const payload = {
          ...(row.payload as object),
          chatId: params.chatId,
          progressMessageId: progress.message_id,
        };
        await db
          .update(projects)
          .set({ payload, updatedAt: new Date() })
          .where(eq(projects.id, result.projectId));
        await db
          .update(jobs)
          .set({
            result: {
              chatId: params.chatId,
              progressMessageId: progress.message_id,
            },
          })
          .where(
            and(
              eq(jobs.projectId, result.projectId),
              eq(jobs.type, "render_carousel"),
            ),
          );
      }
    }
    kickJobWorker();
    // Album + final success message come from the job worker
    return;
  }

  await upsertFlow({
    telegramId: params.telegramId,
    step: "done",
    data: {
      nicheId: params.nicheId,
      topic: params.topic,
      styleId: params.styleId,
      correlationId: result.correlationId,
      projectId: result.projectId,
      errorCode: result.errorCode,
      generationRequestId: params.generationRequestId,
    },
  });
  await safeSend({
    chatId: params.chatId,
    text: errorUserMessage(result.errorCode),
    replyMarkup: errorReplyMarkup(),
  });
}

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

  const callback = update.callback_query;
  const message = update.message ?? callback?.message;
  const fromId = callback?.from?.id ?? message?.from?.id;
  const chatId = message?.chat?.id;
  const telegramId = fromId != null ? String(fromId) : null;
  const text = message?.text?.trim() ?? "";

  // Without DB: only /start welcome (Sprint 0 behaviour)
  if (!hasDatabaseUrl()) {
    if (message && chatId != null && text.startsWith("/start")) {
      await safeSend({
        chatId,
        text: MSG.start,
        replyMarkup: startReplyMarkup(),
      });
    } else if (chatId != null) {
      console.error("DATABASE_URL missing — cannot process bot flow");
    }
    if (callback) {
      await safeAnswer(callback.id);
    }
    return NextResponse.json({ ok: true });
  }

  if (telegramId) {
    const claimed = await claimTelegramUpdate({
      updateId: update.update_id,
      telegramId,
    });
    if (!claimed) {
      if (callback) {
        await safeAnswer(callback.id);
      }
      return NextResponse.json({ ok: true });
    }
  }

  try {
    if (callback && chatId != null && telegramId) {
      await handleCallback({
        callbackId: callback.id,
        data: callback.data,
        chatId,
        telegramId,
      });
      return NextResponse.json({ ok: true });
    }

    if (message && chatId != null && telegramId) {
      await handleMessage({
        text,
        chatId,
        telegramId,
      });
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        type: "webhook_error",
        message: error instanceof Error ? error.message : "unknown",
      }),
    );
  }

  return NextResponse.json({ ok: true });
}

async function handleMessage(params: {
  text: string;
  chatId: number;
  telegramId: string;
}) {
  const { text, chatId, telegramId } = params;
  const command = text.split(/\s+/)[0]?.toLowerCase() ?? "";

  if (command.startsWith("/start")) {
    await upsertTelegramUser(telegramId);
    await safeSend({
      chatId,
      text: MSG.start,
      replyMarkup: startReplyMarkup(),
    });
    return;
  }

  if (command.startsWith("/new")) {
    await beginNewFlow({ telegramId, chatId });
    return;
  }

  if (command.startsWith("/cancel")) {
    await resetFlow(telegramId);
    await safeSend({ chatId, text: MSG.cancelled, replyMarkup: startReplyMarkup() });
    return;
  }

  const flow = await getFlow(telegramId);
  if (!flow || flow.expired) {
    if (flow?.expired) {
      await resetFlow(telegramId);
      await safeSend({ chatId, text: MSG.expired, replyMarkup: startReplyMarkup() });
    }
    return;
  }

  if (flow.step === "await_topic") {
    if (text.length < TOPIC_MIN) {
      await safeSend({ chatId, text: MSG.topicTooShort });
      return;
    }
    if (text.length > TOPIC_MAX) {
      await safeSend({ chatId, text: MSG.topicTooLong });
      return;
    }

    await upsertFlow({
      telegramId,
      step: "await_style",
      data: { ...flow.data, topic: text },
    });
    logEvent("topic_submitted", {
      correlationId: flow.data.correlationId,
      telegramIdHash: hashTelegramId(telegramId),
      nicheId: flow.data.nicheId,
    });
    await safeSend({
      chatId,
      text: MSG.pickStyle,
      replyMarkup: styleReplyMarkup(),
    });
  }
}

async function handleCallback(params: {
  callbackId: string;
  data: string | undefined;
  chatId: number;
  telegramId: string;
}) {
  const { callbackId, data, chatId, telegramId } = params;
  const parsed = parseCallbackData(data);
  await safeAnswer(callbackId);

  if (parsed.type === "new_carousel") {
    await beginNewFlow({ telegramId, chatId });
    return;
  }

  if (parsed.type === "examples") {
    await safeSend({ chatId, text: MSG.examples, replyMarkup: startReplyMarkup() });
    return;
  }

  if (parsed.type === "how_it_works") {
    await safeSend({
      chatId,
      text: MSG.howItWorks,
      replyMarkup: startReplyMarkup(),
    });
    return;
  }

  if (parsed.type === "cancel") {
    await resetFlow(telegramId);
    await safeSend({
      chatId,
      text: MSG.cancelled,
      replyMarkup: startReplyMarkup(),
    });
    return;
  }

  let flow = await getFlow(telegramId);
  if (!flow || flow.expired) {
    await resetFlow(telegramId);
    await safeSend({
      chatId,
      text: MSG.expired,
      replyMarkup: startReplyMarkup(),
    });
    return;
  }

  if (parsed.type === "niche") {
    if (flow.step !== "await_niche" && flow.step !== "await_topic") {
      await safeSend({ chatId, text: MSG.needRestart, replyMarkup: startReplyMarkup() });
      return;
    }
    await upsertFlow({
      telegramId,
      step: "await_topic",
      data: { ...flow.data, nicheId: parsed.nicheId },
    });
    logEvent("niche_selected", {
      correlationId: flow.data.correlationId,
      telegramIdHash: hashTelegramId(telegramId),
      nicheId: parsed.nicheId,
    });
    await safeSend({ chatId, text: MSG.askTopic });
    return;
  }

  if (parsed.type === "style") {
    if (flow.step !== "await_style" || !flow.data.nicheId || !flow.data.topic) {
      await safeSend({ chatId, text: MSG.needRestart, replyMarkup: startReplyMarkup() });
      return;
    }

    const niche = getNiche(flow.data.nicheId as never);
    const style = getStyle(parsed.styleId);
    if (!niche || !style) {
      await safeSend({ chatId, text: MSG.needRestart, replyMarkup: startReplyMarkup() });
      return;
    }

    await upsertFlow({
      telegramId,
      step: "await_style",
      data: { ...flow.data, styleId: parsed.styleId },
    });
    logEvent("style_selected", {
      correlationId: flow.data.correlationId,
      telegramIdHash: hashTelegramId(telegramId),
      nicheId: flow.data.nicheId,
      styleId: parsed.styleId,
    });
    await safeSend({
      chatId,
      text: MSG.confirm(flow.data.topic, niche.label, style.label),
      replyMarkup: confirmReplyMarkup(),
    });
    return;
  }

  if (parsed.type === "confirm_generate") {
    flow = (await getFlow(telegramId)) ?? flow;
    const { nicheId, topic, styleId, correlationId } = flow.data;
    if (!nicheId || !topic || !styleId) {
      await safeSend({ chatId, text: MSG.needRestart, replyMarkup: startReplyMarkup() });
      return;
    }
    await runGenerationAndReply({
      telegramId,
      chatId,
      nicheId,
      topic,
      styleId,
      correlationId: correlationId ?? newCorrelationId(),
    });
    return;
  }

  if (parsed.type === "retry_generate") {
    flow = (await getFlow(telegramId)) ?? flow;
    const { nicheId, topic, styleId, correlationId, projectId } = flow.data;
    if (!nicheId || !topic || !styleId) {
      await safeSend({ chatId, text: MSG.needRestart, replyMarkup: startReplyMarkup() });
      return;
    }
    // New generation request id on retry — new attempt, same correlation
    await runGenerationAndReply({
      telegramId,
      chatId,
      nicheId,
      topic,
      styleId,
      correlationId: correlationId ?? newCorrelationId(),
      existingProjectId: undefined,
      generationRequestId: undefined,
    });
    void projectId;
    return;
  }
}
