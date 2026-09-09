import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { appointments as seed, type Appointment } from "@/lib/data";
import { EmptyState, FilterChips, PageHead, Panel, PrimaryButton } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/rendez-vous")({
  component: AppointmentsPage,
});

const filters = ["Tous", "Téléphone", "Visioconférence", "Rendez-vous physique"] as const;
const slots = ["09:00", "09:30", "10:00", "11:00", "14:00", "14:30", "16:00", "17:00"];

function AppointmentsPage() {
  const [list, setList] = useState<Appointment[]>(seed);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tous");
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(slots[2]);

  const filtered = useMemo(
    () => (filter === "Tous" ? list : list.filter((a) => a.type === filter)),
    [list, filter],
  );

  return (
    <>
      <PageHead
        eyebrow="Agenda"
        title="Rendez-vous"
        subtitle="Rendez-vous pris par l'agent IA ou créés par l'équipe commerciale."
        action={<PrimaryButton onClick={() => setOpen(true)}>Programmer un rendez-vous</PrimaryButton>}
      />

      <div className="mb-4">
        <FilterChips options={filters} value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-2">
          {filtered.length === 0 ? (
            <EmptyState title="Aucun rendez-vous" text="Aucun rendez-vous ne correspond à ce type." />
          ) : (
            filtered.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-4 rounded-2xl p-4 glass">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-center text-xs leading-tight text-primary">
                  {a.day.split(" ")[0]}
                  <br />
                  <span className="font-display text-lg font-semibold">{a.day.split(" ")[1]}</span>
                </div>
                <div className="min-w-[180px] flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-mist">
                    {a.contact} · {a.company}
                  </p>
                  <p className="mt-1 text-xs text-mist">
                    {a.date} à {a.hour} · {a.type} · {a.owner}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium",
                    a.status === "Confirmé" ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
                  )}
                >
                  {a.status}
                </span>
                {a.status === "En attente" && (
                  <button
                    type="button"
                    onClick={() => {
                      setList((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: "Confirmé" } : x)));
                      toast.success("Rendez-vous confirmé");
                    }}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
                  >
                    Confirmer
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <Panel title="Créneaux disponibles" action={<span className="text-[11px] text-mist">Jeudi 10 sept.</span>}>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm",
                  s === slot ? "border-primary/60 bg-primary/15 text-primary" : "border-border text-mist",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-mist">
            Ces créneaux sont ceux que l'agent IA propose aux clients lors d'une prise de rendez-vous.
          </p>
        </Panel>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              toast.success("Rendez-vous programmé", { description: `Créneau ${slot}` });
            }}
            className="w-full max-w-md rounded-2xl p-6 glass"
          >
            <h2 className="font-display text-xl font-semibold">Programmer un rendez-vous</h2>
            <div className="mt-4 space-y-3">
              <input
                required
                placeholder="Objet du rendez-vous"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <input
                required
                placeholder="Client"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <select className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary">
                {filters.slice(1).map((t) => (
                  <option key={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
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
              <PrimaryButton type="submit">Programmer</PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
