import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { analytics } from "@/lib/data";
import { KpiCard, PageHead, Panel } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/analyse")({
  component: AnalysePage,
});

function AnalysePage() {
  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Analyse des réseaux"
        subtitle={`Données des comptes connectés : ${analytics.connectedNetworks.join(", ")}.`}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {analytics.metrics.map((m) => (
          <KpiCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Taux d'engagement" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.engagement}>
                <defs>
                  <linearGradient id="eng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="period" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  fill="url(#eng)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Publications les plus performantes">
          <div className="space-y-2">
            {analytics.topPosts.map((p) => (
              <div key={p.title} className="rounded-xl border border-border p-3">
                <p className="text-sm font-medium">{p.title}</p>
                <p className="mt-1 text-xs text-mist">
                  {p.network} · engagement {p.engagement}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Analyse de l'IA" className="lg:col-span-3">
          <p className="text-sm text-mist">{analytics.aiAnalysis}</p>
        </Panel>
      </div>
    </>
  );
}
