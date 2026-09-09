import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { quoteRequests as seed, type QuoteRequest } from "@/lib/data";
import { ChannelChip, EmptyState, FilterChips, PageHead, PrimaryButton, StatusChip } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/demandes")({
  component: DemandesPage,
});

const serviceFilters = [
  "Tous",
  "Textile",
  "Sublimation",
  "Publicité",
  "Impression",
  "Sacherie",
  "Aménagement",
] as const;

function DemandesPage() {
  const [list] = useState<QuoteRequest[]>(seed);
  const [filter, setFilter] = useState<(typeof serviceFilters)[number]>("Tous");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => (filter === "Tous" ? list : list.filter((q) => q.service === filter)),
    [list, filter],
  );

  return (
    <>
      <PageHead
        eyebrow="Commercial"
        title="Demandes & devis"
        subtitle="Toutes les demandes issues du site, de l'assistant IA et des réseaux sociaux."
        action={<PrimaryButton onClick={() => setOpen(true)}>Nouvelle demande</PrimaryButton>}
      />

      <div className="mb-4">
        <FilterChips options={serviceFilters} value={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Aucune demande" text="Aucune demande enregistrée pour ce service." />
      ) : (
        <div className="overflow-x-auto rounded-2xl glass">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-mist">
                <th className="p-4 font-medium">Référence</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Détail</th>
                <th className="p-4 font-medium">Canal</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium">Reçue le</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-0 hover:bg-foreground/5">
                  <td className="p-4 font-medium">{q.reference}</td>
                  <td className="p-4">
                    <p>{q.contact}</p>
                    <p className="text-xs text-mist">{q.company}</p>
                  </td>
                  <td className="p-4 text-mist">{q.service}</td>
                  <td className="p-4">
                    <p className="text-xs">{q.detail}</p>
                    <p className="text-xs text-mist">
                      {q.quantity} · {q.city} · {q.deadline}
                    </p>
                  </td>
                  <td className="p-4">
                    <ChannelChip channel={q.channel} />
                  </td>
                  <td className="p-4">
                    <StatusChip status={q.status} />
                  </td>
                  <td className="p-4 text-xs text-mist">{q.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              toast.success("Demande créée", { description: "Elle est ajoutée au suivi commercial." });
            }}
            className="w-full max-w-lg rounded-2xl p-6 glass"
          >
            <h2 className="font-display text-xl font-semibold">Nouvelle demande</h2>
            <div className="mt-4 space-y-3">
              <input
                required
                placeholder="Client"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <input
                placeholder="Entreprise"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <select
                defaultValue="Textile"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {serviceFilters.slice(1).map((s) => (
                  <option key={s} className="bg-ink">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                rows={3}
                placeholder="Détail de la demande"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-mist hover:text-foreground"
              >
                Annuler
              </button>
              <PrimaryButton type="submit">Créer la demande</PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
