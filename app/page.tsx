import { PreviewPlayer } from "@/components/PreviewPlayer";
import { niches, styles, templates } from "@/lib/meta";
import { FORMAT_DIMENSIONS } from "@/lib/schemas";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16 md:flex-row md:items-center md:gap-16">
        <section className="flex flex-1 flex-col gap-6">
          <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
            slides-machine
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
            Тема → карусель → рилс
          </h1>
          <p className="max-w-md text-lg text-muted">
            Sprint 0: схема проекта, meta шаблонов, Neon, Blob smoke и Telegram
            /start. Remotion Player — превью одного слайда.
          </p>
          <ul className="grid gap-2 text-sm text-muted">
            <li>
              Форматы:{" "}
              {Object.entries(FORMAT_DIMENSIONS)
                .map(
                  ([id, d]) =>
                    `${id} ${d.width}×${d.height}`,
                )
                .join(" · ")}
            </li>
            <li>
              Ниши: {niches.map((n) => n.label).join(" · ")}
            </li>
            <li>
              Шаблоны: {templates.length} · Стили:{" "}
              {styles.map((s) => s.label).join(" · ")}
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <a
              className="rounded-md bg-accent px-4 py-2 font-semibold text-background"
              href="/api/health"
            >
              /api/health
            </a>
            <span className="rounded-md border border-white/15 px-4 py-2 text-muted">
              POST /api/blob/smoke
            </span>
            <span className="rounded-md border border-white/15 px-4 py-2 text-muted">
              POST /api/telegram/webhook
            </span>
          </div>
        </section>
        <section className="flex flex-1 justify-center md:justify-end">
          <PreviewPlayer />
        </section>
      </main>
    </div>
  );
}
