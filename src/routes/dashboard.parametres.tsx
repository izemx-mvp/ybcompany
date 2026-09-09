import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { company } from "@/lib/data";
import { PageHead, Panel, PrimaryButton } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/parametres")({
  component: SettingsPage,
});

const notifPrefs = [
  "Nouveau prospect",
  "Nouvelle demande de devis",
  "Demande de conseiller humain",
  "Nouveau rendez-vous",
  "Publication à valider",
  "Erreur de publication",
];

function SettingsPage() {
  const [enabled, setEnabled] = useState<string[]>(notifPrefs.slice(0, 4));
  const [hours, setHours] = useState(company.hours ?? "Lundi – Vendredi, 9h00 – 18h00");

  return (
    <>
      <PageHead
        eyebrow="Configuration"
        title="Paramètres"
        subtitle="Informations de l'entreprise, horaires et notifications de l'équipe."
        action={<PrimaryButton onClick={() => toast.success("Paramètres enregistrés")}>Enregistrer</PrimaryButton>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Informations entreprise">
          <div className="space-y-3">
            {[
              ["Nom", company.name],
              ["Téléphone", company.phone],
              ["Email", company.email],
              ["Adresse", company.address],
            ].map(([label, value]) => (
              <label key={label} className="block text-xs text-mist">
                {label}
                <input
                  defaultValue={value}
                  className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </label>
            ))}
            <label className="block text-xs text-mist">
              Horaires
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
          </div>
        </Panel>

        <Panel title="Notifications de l'équipe">
          <div className="space-y-2">
            {notifPrefs.map((n) => {
              const on = enabled.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEnabled((prev) => (on ? prev.filter((x) => x !== n) : [...prev, n]))}
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-border p-3 text-left text-sm hover:bg-foreground/5"
                >
                  {n}
                  <span
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      on ? "bg-primary" : "bg-foreground/15",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 size-5 rounded-full bg-background transition-all",
                        on ? "left-[22px]" : "left-0.5",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>
    </>
  );
}
