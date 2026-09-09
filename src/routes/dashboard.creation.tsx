import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  contentFormats,
  contentIdeas,
  contentLanguages,
  contentNetworks,
  contentTones,
  mediaLibrary,
} from "@/lib/data";
import { PageHead, Panel, PrimaryButton } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

type Search = { idea?: string };

export const Route = createFileRoute("/dashboard/creation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    idea: typeof search.idea === "string" ? search.idea : undefined,
  }),
  component: CreationPage,
});

function CreationPage() {
  const { idea: ideaId } = Route.useSearch();
  const idea = contentIdeas.find((i) => i.id === ideaId);

  const [network, setNetwork] = useState<string>(idea?.network ?? contentNetworks[0]);
  const [format, setFormat] = useState<string>(idea?.format ?? contentFormats[0]);
  const [tone, setTone] = useState<string>(contentTones[0]);
  const [language, setLanguage] = useState<string>(contentLanguages[0]);
  const [media, setMedia] = useState(mediaLibrary[0]);
  const [caption, setCaption] = useState(
    idea
      ? `${idea.hook}\n\n${idea.concept}\n\nYB COMPANY — production textile et communication visuelle à Casablanca.\n\n#YBCOMPANY #Casablanca #Production`
      : "Rédigez votre publication, ou laissez l'IA proposer un texte à partir d'une idée.",
  );

  const hashtags = ["#YBCOMPANY", "#Casablanca", "#Textile", "#Sublimation", "#Sacherie", "#CommunicationVisuelle"];

  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Création de contenu"
        subtitle={idea ? `À partir de l'idée : ${idea.title}` : "Composez une publication et prévisualisez le rendu."}
        action={
          <PrimaryButton onClick={() => toast.success("Publication enregistrée", { description: "Statut : À valider" })}>
            Enregistrer
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel title="Paramètres">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Réseau", value: network, set: setNetwork, options: contentNetworks as readonly string[] },
                { label: "Format", value: format, set: setFormat, options: contentFormats as readonly string[] },
                { label: "Ton", value: tone, set: setTone, options: contentTones as readonly string[] },
                { label: "Langue", value: language, set: setLanguage, options: contentLanguages as readonly string[] },
              ].map((f) => (
                <label key={f.label} className="text-xs text-mist">
                  {f.label}
                  <select
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    {f.options.map((o) => (
                      <option key={o} className="bg-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </Panel>

          <Panel
            title="Texte de la publication"
            action={
              <button
                type="button"
                onClick={() => toast.success("Texte régénéré par l'IA")}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
              >
                Régénérer avec l'IA
              </button>
            }
          >
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={9}
              className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hashtags.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setCaption((c) => `${c} ${h}`)}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-mist hover:text-foreground"
                >
                  {h}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Visuel">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {mediaLibrary.slice(0, 10).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMedia(m)}
                  className={cn(
                    "overflow-hidden rounded-lg border-2",
                    m.id === media.id ? "border-primary" : "border-transparent",
                  )}
                >
                  <img src={m.image} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel title="Aperçu">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center gap-2 p-3">
                <span className="grid size-8 place-items-center rounded-full text-[10px] font-bold text-primary-foreground gradient-brand">
                  YB
                </span>
                <div>
                  <p className="text-xs font-semibold">yb.company</p>
                  <p className="text-[10px] text-mist">Casablanca · {network}</p>
                </div>
              </div>
              <img src={media.image} alt={media.name} loading="lazy" className="aspect-square w-full object-cover" />
              <p className="whitespace-pre-line p-3 text-xs text-mist">{caption}</p>
            </div>
          </Panel>

          <Panel title="Planification">
            <div className="space-y-2">
              <input
                type="date"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="time"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <PrimaryButton
                className="w-full"
                onClick={() => toast.success("Publication planifiée", { description: `${network} · ${format}` })}
              >
                Planifier la publication
              </PrimaryButton>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
