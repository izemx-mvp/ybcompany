import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { integrations as seed, type Integration } from "@/lib/data";
import { PageHead } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/integrations")({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const [list, setList] = useState<Integration[]>(seed);

  return (
    <>
      <PageHead
        eyebrow="Configuration"
        title="Intégrations"
        subtitle="Canaux de conversation, publication et agenda reliés à la plateforme."
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((i) => (
          <div key={i.id} className="flex flex-col rounded-2xl p-4 glass">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-base font-semibold">{i.name}</h2>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium",
                  i.connected ? "bg-success/15 text-success" : "bg-foreground/10 text-mist",
                )}
              >
                {i.connected ? "Connecté" : "Non connecté"}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm text-mist">{i.description}</p>
            <button
              type="button"
              onClick={() => {
                setList((prev) => prev.map((x) => (x.id === i.id ? { ...x, connected: !x.connected } : x)));
                toast.success(i.connected ? `${i.name} déconnecté` : `${i.name} connecté`);
              }}
              className={cn(
                "mt-4 rounded-xl px-4 py-2 text-sm font-semibold",
                i.connected
                  ? "border border-border text-mist hover:text-foreground"
                  : "text-primary-foreground gradient-brand",
              )}
            >
              {i.connected ? "Déconnecter" : "Connecter"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
