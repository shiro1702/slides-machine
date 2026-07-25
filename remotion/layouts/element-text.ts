import type { Element } from "@/lib/schemas";

export function elementText(el: Element): string {
  if (typeof el.content === "string") return el.content;
  if (el.content && typeof el.content === "object" && "text" in el.content) {
    return String((el.content as { text?: unknown }).text ?? "");
  }
  return "";
}
