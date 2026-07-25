import { eq } from "drizzle-orm";
import { getDb, type Db } from "@/lib/db";
import {
  botFlows,
  type BotFlowData,
  type BotFlowRow,
} from "@/lib/db/schema";
import {
  isFlowExpired,
  type FlowStep,
} from "@/lib/telegram/flow-steps";

export type FlowSession = {
  telegramId: string;
  step: FlowStep;
  data: BotFlowData;
  updatedAt: Date;
  expired: boolean;
};

function toSession(row: BotFlowRow): FlowSession {
  return {
    telegramId: row.telegramId,
    step: row.step as FlowStep,
    data: (row.data ?? {}) as BotFlowData,
    updatedAt: row.updatedAt,
    expired: isFlowExpired(row.updatedAt),
  };
}

export async function getFlow(
  telegramId: string,
  db: Db = getDb(),
): Promise<FlowSession | null> {
  const rows = await db
    .select()
    .from(botFlows)
    .where(eq(botFlows.telegramId, telegramId))
    .limit(1);
  if (!rows[0]) return null;
  return toSession(rows[0]);
}

export async function upsertFlow(params: {
  telegramId: string;
  step: FlowStep;
  data?: BotFlowData;
  mergeData?: boolean;
  db?: Db;
}): Promise<FlowSession> {
  const db = params.db ?? getDb();
  const existing = await getFlow(params.telegramId, db);
  const nextData =
    params.mergeData && existing
      ? { ...existing.data, ...params.data }
      : (params.data ?? {});

  const [row] = await db
    .insert(botFlows)
    .values({
      telegramId: params.telegramId,
      step: params.step,
      data: nextData,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: botFlows.telegramId,
      set: {
        step: params.step,
        data: nextData,
        updatedAt: new Date(),
      },
    })
    .returning();

  return toSession(row);
}

export async function resetFlow(
  telegramId: string,
  db: Db = getDb(),
): Promise<void> {
  await db
    .insert(botFlows)
    .values({
      telegramId,
      step: "idle",
      data: {},
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: botFlows.telegramId,
      set: {
        step: "idle",
        data: {},
        updatedAt: new Date(),
      },
    });
}

export async function clearFlowError(
  telegramId: string,
  db: Db = getDb(),
): Promise<FlowSession | null> {
  const existing = await getFlow(telegramId, db);
  if (!existing) return null;
  const rest = { ...existing.data };
  delete rest.errorCode;
  return upsertFlow({
    telegramId,
    step: existing.step,
    data: rest,
    db,
  });
}
