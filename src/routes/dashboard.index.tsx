import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  appointments,
  conversations,
  images,
  integrations,
  kpis,
  leads,
  requestsByPeriod,
  requestsByService,
  socialPosts,
} from "@/lib/data";
import { ChannelChip, KpiCard, PageHead, Panel, PrimaryButton, ScoreChip, StatusChip } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function Overview() {
  return (
    <>
      <PageHead
        eyebrow="Vue d'ensemble"
        title="Bonjour, voici l'activité YB COMPANY"
        subtitle="Mercredi 9 septembre · Temps réel sur 4 canaux"
        action={
          <Link to="/dashboard/demandes">
            <PrimaryButton>Nouvelle demande de devis</PrimaryButton>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        <Panel
          title="Demandes par période"
          className="lg:col-span-2"
          action={<span className="text-[11px] text-mist">6 dernières semaines</span>}
        >
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={requestsByPeriod}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="period" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }} />
                <Line type="monotone" dataKey="demandes" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rdv" name="rendez-vous" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Demandes par service" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestsByService} layout="vertical" margin={{ left: 24 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="service"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={90}
                />
                <Tooltip
                  cursor={{ fill: "oklch(1 0 0 / 5%)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" radius={6}>
                  {requestsByService.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Dernières conversations"
          className="lg:col-span-2"
          action={
            <Link to="/dashboard/conversations" className="text-xs text-accent">
              Tout voir →
            </Link>
          }
        >
          <div className="space-y-2">
            {conversations.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                to="/dashboard/conversations"
                className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-foreground/5"
              >
                <ChannelChip channel={c.channel} compact />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {c.contact} · {c.subject}
                  </p>
                  <p className="truncate text-xs text-mist">{c.messages[c.messages.length - 1]?.text}</p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusChip status={c.status} />
                  <p className="mt-1 text-[10px] text-mist">{c.lastAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="relative overflow-hidden rounded-2xl border border-border lg:col-span-1 lg:row-span-2">
          <img
            src={images.heroProduction}
            alt="Atelier de production YB COMPANY"
            loading="lazy"
            width={1920}
            height={1088}
            className="h-full min-h-[280px] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Production Maroc</p>
            <p className="mt-1 font-display text-lg font-semibold leading-tight">
              De l'idée à la production, nous donnons vie à vos projets.
            </p>
          </div>
        </div>

        <Panel
          title="Prochains rendez-vous"
          className="lg:col-span-1"
          action={
            <Link to="/dashboard/rendez-vous" className="text-xs text-accent">
              Voir →
            </Link>
          }
        >
          <div className="space-y-2">
            {appointments.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-center text-[10px] leading-tight text-primary">
                  {a.day.split(" ")[0]}
                  <br />
                  {a.day.split(" ")[1]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-mist">
                    {a.hour} · {a.company} · {a.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Derniers prospects"
          className="lg:col-span-2"
          action={
            <Link to="/dashboard/prospects" className="text-xs text-accent">
              Tout voir →
            </Link>
          }
        >
          <div className="space-y-2">
            {leads.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <ChannelChip channel={l.channel} compact />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {l.name} · {l.company}
                  </p>
                  <p className="truncate text-xs text-mist">
                    {l.service} — {l.product} ({l.quantity})
                  </p>
                </div>
                <ScoreChip score={l.score} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Publications à venir" className="lg:col-span-1">
          <div className="space-y-2">
            {socialPosts
              .filter((p) => p.status === "Planifié" || p.status === "À valider")
              .slice(0, 3)
              .map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <img src={p.image} alt="" loading="lazy" className="size-11 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-mist">
                      {p.format} · {p.network} · {p.hour}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Panel>

        <Panel title="Intégrations" className="lg:col-span-1">
          <div className="grid gap-2 text-xs">
            {integrations.slice(0, 6).map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span>{i.name}</span>
                <span className={i.connected ? "text-success" : "text-mist"}>
                  {i.connected ? "● Connecté" : "○ Non connecté"}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
