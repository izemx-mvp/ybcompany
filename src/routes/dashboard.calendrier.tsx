import { createFileRoute } from "@tanstack/react-router";
import { socialPosts } from "@/lib/data";
import { PageHead, Panel, PostStatusChip } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/calendrier")({
  component: CalendarPage,
});

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const dates = ["2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-12", "2026-09-13"];

function CalendarPage() {
  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Calendrier éditorial"
        subtitle="Semaine du 7 au 13 septembre · vue hebdomadaire des publications planifiées."
      />

      <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
        {dates.map((d, i) => {
          const posts = socialPosts.filter((p) => p.date === d);
          return (
            <div key={d} className="min-h-[200px] rounded-2xl p-3 glass">
              <p className="text-xs font-semibold">
                {days[i]} <span className="text-mist">{d.slice(8)}</span>
              </p>
              <div className="mt-3 space-y-2">
                {posts.length === 0 && <p className="text-[11px] text-mist">Aucune publication</p>}
                {posts.map((p) => (
                  <div key={p.id} className="rounded-lg border border-border p-2">
                    <img src={p.image} alt="" loading="lazy" className="mb-2 h-16 w-full rounded object-cover" />
                    <p className="text-[11px] font-medium leading-tight">{p.title}</p>
                    <p className="mt-1 text-[10px] text-mist">
                      {p.hour} · {p.network}
                    </p>
                    <div className="mt-1">
                      <PostStatusChip status={p.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <Panel title="Légende">
          <div className="flex flex-wrap gap-2">
            {(["Brouillon", "À valider", "Validé", "Planifié", "Publié", "Erreur"] as const).map((s) => (
              <PostStatusChip key={s} status={s} />
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
