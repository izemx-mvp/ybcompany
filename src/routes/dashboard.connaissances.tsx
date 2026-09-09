import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { faq, knowledgeSources as seed, type KnowledgeSource } from "@/lib/data";
import { PageHead, Panel, PrimaryButton } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/connaissances")({
  component: KnowledgePage,
});

function KnowledgePage() {
  const [list, setList] = useState<KnowledgeSource[]>(seed);

  return (
    <>
      <PageHead
        eyebrow="Configuration"
        title="Base de connaissances"
        subtitle="Les documents que l'agent IA utilise pour répondre. Il ne répond jamais en dehors de ces sources."
        action={
          <PrimaryButton onClick={() => toast.success("Import de document disponible")}>
            Ajouter un document
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-2">
          {list.map((k) => (
            <div key={k.id} className="flex flex-wrap items-center gap-3 rounded-2xl p-4 glass">
              <div className="min-w-[200px] flex-1">
                <p className="text-sm font-medium">{k.name}</p>
                <p className="text-xs text-mist">
                  {k.type} · ajouté le {k.addedAt} · dernière synchronisation : {k.syncedAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setList((prev) => prev.map((x) => (x.id === k.id ? { ...x, active: !x.active } : x)));
                  toast.success(k.active ? "Source désactivée" : "Source activée");
                }}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-medium",
                  k.active ? "bg-success/15 text-success" : "border border-border text-mist",
                )}
              >
                {k.active ? "Active" : "Inactive"}
              </button>
              <button
                type="button"
                onClick={() => toast.success("Synchronisation lancée")}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
              >
                Synchroniser
              </button>
            </div>
          ))}
        </div>

        <Panel title="FAQ utilisée par l'IA">
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.question} className="rounded-xl border border-border p-3">
                <summary className="cursor-pointer text-sm font-medium">{f.question}</summary>
                <p className="mt-2 text-xs text-mist">{f.answer}</p>
              </details>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
