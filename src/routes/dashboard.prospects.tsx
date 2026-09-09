import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { leads as seed, leadStatuses, type Lead, type LeadStatus } from "@/lib/data";
import {
  ChannelChip,
  EmptyState,
  FilterChips,
  PageHead,
  Panel,
  ScoreChip,
  StatusChip,
} from "@/components/dash/ui";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/prospects")({
  component: ProspectsPage,
});

const statusFilters = ["Tous", ...leadStatuses] as const;

function ProspectsPage() {
  const [list, setList] = useState<Lead[]>(seed);
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("Tous");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (l) =>
          (filter === "Tous" || l.status === filter) &&
          (query.trim() === "" ||
            `${l.name} ${l.company} ${l.service} ${l.product} ${l.city}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [list, filter, query],
  );

  function setStatus(id: string, status: LeadStatus) {
    setList((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    toast.success("Statut mis à jour", { description: status });
  }

  return (
    <>
      <PageHead
        eyebrow="Prospects"
        title="Fiches générées par l'IA"
        subtitle="Chaque conversation qualifiée produit une fiche structurée, prête pour le suivi commercial."
      />

      <Panel
        action={
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un prospect…"
            className="w-56 rounded-lg border border-border bg-ink/40 px-3 py-2 text-xs outline-none placeholder:text-mist focus:border-primary"
          />
        }
        title="Filtres"
      >
        <FilterChips options={statusFilters} value={filter} onChange={setFilter} />
      </Panel>

      <div className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <EmptyState
            title="Aucun prospect"
            text="Aucune fiche ne correspond à ce filtre. Modifiez le statut recherché ou la recherche."
          />
        ) : (
          filtered.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setSelected(l)}
              className="flex w-full flex-wrap items-center gap-3 rounded-2xl p-4 text-left glass hover:bg-foreground/10"
            >
              <ChannelChip channel={l.channel} />
              <div className="min-w-[200px] flex-1">
                <p className="text-sm font-medium">
                  {l.name} {l.company && <span className="text-mist">· {l.company}</span>}
                </p>
                <p className="text-xs text-mist">
                  {l.service} — {l.product} · {l.quantity} · {l.city}
                </p>
              </div>
              <div className="text-xs text-mist">
                <p>Budget : {l.budget}</p>
                <p>Deadline : {l.deadline}</p>
              </div>
              <ScoreChip score={l.score} />
              <StatusChip status={l.status} />
            </button>
          ))
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 glass">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Fiche prospect</p>
                <h2 className="mt-1 font-display text-xl font-semibold">
                  {selected.name} · {selected.company}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
              >
                Fermer
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Téléphone", selected.phone],
                ["Email", selected.email],
                ["Canal d'origine", selected.channel],
                ["Service demandé", selected.service],
                ["Produit demandé", selected.product],
                ["Quantité", selected.quantity],
                ["Budget", selected.budget],
                ["Deadline", selected.deadline],
                ["Ville", selected.city],
                ["Prochaine action", selected.nextAction],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg p-3 glass-soft">
                  <p className="text-[11px] text-mist">{k}</p>
                  <p className="mt-0.5 text-sm">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg p-3 glass-soft">
              <p className="text-[11px] text-mist">Description du besoin</p>
              <p className="mt-1 text-sm">{selected.need}</p>
            </div>
            <div className="mt-3 rounded-lg p-3 glass-soft">
              <p className="text-[11px] text-mist">Résumé IA de la conversation</p>
              <p className="mt-1 text-sm">{selected.summary}</p>
            </div>
            <div className="mt-3 rounded-lg p-3 glass-soft">
              <p className="text-[11px] text-mist">Documents envoyés</p>
              <p className="mt-1 text-sm">
                {selected.documents.length ? selected.documents.join(", ") : "Aucun document"}
              </p>
            </div>

            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-mist">Statut</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {leadStatuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(selected.id, s)}
                  className={
                    s === selected.status
                      ? "rounded-full px-3 py-1.5 text-[11px] font-medium text-primary-foreground gradient-brand"
                      : "rounded-full border border-border px-3 py-1.5 text-[11px] text-mist hover:text-foreground"
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
