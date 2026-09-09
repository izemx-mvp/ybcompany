import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  contentFormats,
  contentIdeas,
  contentNetworks,
  contentObjectives,
  contentServices,
} from "@/lib/data";
import { EmptyState, FilterChips, PageHead, Panel, PrimaryButton } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/idees")({
  component: IdeasPage,
});

const serviceFilters = ["Tous", ...contentServices] as const;

function IdeasPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof serviceFilters)[number]>("Tous");
  const [objective, setObjective] = useState<string>(contentObjectives[0]);
  const [network, setNetwork] = useState<string>(contentNetworks[0]);
  const [format, setFormat] = useState<string>(contentFormats[0]);

  const filtered = useMemo(
    () => (filter === "Tous" ? contentIdeas : contentIdeas.filter((i) => i.service === filter)),
    [filter],
  );

  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Idées de contenus"
        subtitle="Propositions générées à partir des services, réalisations et actualités de YB COMPANY."
      />

      <Panel title="Générer de nouvelles idées">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-mist">
            Objectif
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {contentObjectives.map((o) => (
                <option key={o} className="bg-ink">
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-mist">
            Réseau
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {contentNetworks.map((n) => (
                <option key={n} className="bg-ink">
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-mist">
            Format
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {contentFormats.map((f) => (
                <option key={f} className="bg-ink">
                  {f}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3">
          <PrimaryButton
            onClick={() =>
              toast.success("Nouvelles idées générées", {
                description: `${objective} · ${network} · ${format}`,
              })
            }
          >
            Générer des idées
          </PrimaryButton>
        </div>
      </Panel>

      <div className="my-4">
        <FilterChips options={serviceFilters} value={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Aucune idée" text="Aucune idée pour ce service. Générez-en de nouvelles." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((i) => (
            <article key={i.id} className="flex flex-col rounded-2xl p-4 glass">
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="rounded-full bg-accent/15 px-2 py-1 text-accent">{i.network}</span>
                <span className="rounded-full bg-foreground/10 px-2 py-1 text-mist">{i.format}</span>
                <span className="rounded-full bg-foreground/10 px-2 py-1 text-mist">{i.service}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug">{i.title}</h3>
              <p className="mt-2 text-sm text-mist">{i.concept}</p>
              <p className="mt-3 rounded-lg border border-border p-3 text-sm">
                <span className="mb-1 block text-[10px] uppercase tracking-[0.15em] text-mist">Accroche</span>
                {i.hook}
              </p>
              <p className="mt-2 text-xs text-mist">Objectif : {i.objective}</p>
              <div className="mt-4">
                <PrimaryButton
                  className="w-full"
                  onClick={() => navigate({ to: "/dashboard/creation", search: { idea: i.id } })}
                >
                  Créer le contenu
                </PrimaryButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
