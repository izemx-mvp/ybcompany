import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { integrations, services } from "@/lib/data";
import { PageHead, Panel, PrimaryButton } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/agent")({
  component: AgentPage,
});

const tones = ["Professionnel", "Commercial", "Chaleureux", "Direct"] as const;
const languages = ["Français", "Arabe (darija)", "Anglais"] as const;

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-border p-3 text-left hover:bg-foreground/5"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-mist">{description}</span>}
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-foreground/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-background transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

function AgentPage() {
  const [active, setActive] = useState(true);
  const [tone, setTone] = useState<(typeof tones)[number]>("Professionnel");
  const [langs, setLangs] = useState<string[]>(["Français", "Arabe (darija)"]);
  const [autoQualify, setAutoQualify] = useState(true);
  const [autoRdv, setAutoRdv] = useState(true);
  const [handover, setHandover] = useState(true);
  const [channels, setChannels] = useState<string[]>(["whatsapp", "instagram", "facebook"]);
  const [welcome, setWelcome] = useState(
    "Bonjour et bienvenue chez YB COMPANY. Je peux vous renseigner sur nos services, comprendre votre besoin et transmettre votre demande à notre équipe.",
  );

  function toggleIn(list: string[], value: string, set: (v: string[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  return (
    <>
      <PageHead
        eyebrow="Agent IA"
        title="Service Client IA"
        subtitle="Configurez le comportement de l'assistant présent sur le site et les réseaux sociaux."
        action={<PrimaryButton onClick={() => toast.success("Configuration enregistrée")}>Enregistrer</PrimaryButton>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel title="État de l'agent">
            <Toggle
              label="Agent IA actif"
              description="Lorsqu'il est désactivé, toutes les conversations arrivent directement en mode humain."
              checked={active}
              onChange={setActive}
            />
          </Panel>

          <Panel title="Ton et langues">
            <p className="text-xs text-mist">Ton des réponses</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[11px] font-medium",
                    t === tone
                      ? "text-primary-foreground gradient-brand"
                      : "border border-border text-mist hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-mist">Langues gérées</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => toggleIn(langs, l, setLangs)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[11px] font-medium",
                    langs.includes(l)
                      ? "bg-accent/15 text-accent"
                      : "border border-border text-mist hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Message d'accueil">
            <textarea
              value={welcome}
              onChange={(e) => setWelcome(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </Panel>

          <Panel title="Comportements">
            <div className="space-y-2">
              <Toggle
                label="Qualification automatique des demandes"
                description="L'IA collecte service, produit, quantité, budget, délai et ville, puis crée une fiche prospect."
                checked={autoQualify}
                onChange={setAutoQualify}
              />
              <Toggle
                label="Prise de rendez-vous automatique"
                description="L'IA propose des créneaux disponibles et enregistre le rendez-vous."
                checked={autoRdv}
                onChange={setAutoRdv}
              />
              <Toggle
                label="Transfert vers un conseiller"
                description="Sur demande du client ou lorsque l'IA ne dispose pas de l'information."
                checked={handover}
                onChange={setHandover}
              />
            </div>
          </Panel>

          <Panel title="Canaux couverts">
            <div className="grid gap-2 sm:grid-cols-2">
              {integrations
                .filter((i) => ["whatsapp", "instagram", "facebook"].includes(i.id))
                .map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggleIn(channels, i.id, setChannels)}
                    className={cn(
                      "rounded-xl border p-3 text-left text-sm",
                      channels.includes(i.id) ? "border-primary/50 bg-primary/10" : "border-border text-mist",
                    )}
                  >
                    <span className="font-medium">{i.name}</span>
                    <span className="mt-0.5 block text-xs text-mist">{i.description}</span>
                  </button>
                ))}
              <div className="rounded-xl border border-primary/50 bg-primary/10 p-3 text-sm">
                <span className="font-medium">Site web</span>
                <span className="mt-0.5 block text-xs text-mist">Assistant intégré à toutes les pages publiques.</span>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title="Règle de non-invention">
            <p className="text-sm text-mist">
              L'agent ne communique jamais de prix, de tarif, de budget ou de délai. Toute question de ce type reçoit
              cette réponse :
            </p>
            <p className="mt-3 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm">
              Cette demande nécessite une validation de notre équipe. Je peux récupérer vos informations afin qu'un
              conseiller YB COMPANY vous recontacte.
            </p>
          </Panel>

          <Panel title="Services connus de l'IA">
            <ul className="space-y-1.5 text-sm">
              {services.map((s) => (
                <li key={s.slug} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {s.name}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
