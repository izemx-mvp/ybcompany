import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  CalendarDays,
  CalendarRange,
  FileText,
  Image,
  LayoutDashboard,
  Lightbulb,
  Link2,
  MessageSquare,
  Menu,
  PenLine,
  Send,
  Settings,
  Sparkle,
  TrendingUp,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import logo from "@/assets/yb-logo.png";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard YB COMPANY — service client IA et community manager" },
      {
        name: "description",
        content:
          "Centralisez les conversations, prospects, demandes de devis, rendez-vous et publications YB COMPANY dans un seul tableau de bord.",
      },
      { property: "og:title", content: "Dashboard YB COMPANY" },
      {
        property: "og:description",
        content: "Conversations omnicanales, prospects qualifiés et community manager IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardLayout,
});

const groups = [
  {
    label: "Général",
    items: [
      { to: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
      { to: "/dashboard/agent", label: "Service Client IA", icon: Sparkle },
      { to: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
      { to: "/dashboard/prospects", label: "Prospects", icon: Users },
      { to: "/dashboard/demandes", label: "Demandes & Devis", icon: FileText },
      { to: "/dashboard/rendez-vous", label: "Rendez-vous", icon: CalendarDays },
    ],
  },
  {
    label: "Community Manager IA",
    items: [
      { to: "/dashboard/idees", label: "Idées de contenus", icon: Lightbulb },
      { to: "/dashboard/creation", label: "Création de contenu", icon: PenLine },
      { to: "/dashboard/calendrier", label: "Calendrier éditorial", icon: CalendarRange },
      { to: "/dashboard/publications", label: "Publications", icon: Send },
      { to: "/dashboard/mediatheque", label: "Médiathèque", icon: Image },
      { to: "/dashboard/analyse", label: "Analyse réseaux", icon: TrendingUp },
    ],
  },
  {
    label: "Configuration",
    items: [
      { to: "/dashboard/connaissances", label: "Base de connaissances", icon: FileText },
      { to: "/dashboard/integrations", label: "Intégrations", icon: Link2 },
      { to: "/dashboard/utilisateurs", label: "Utilisateurs", icon: UsersRound },
      { to: "/dashboard/parametres", label: "Paramètres", icon: Settings },
    ],
  },
] as const;

function DashboardLayout() {
  const [mobileNav, setMobileNav] = useState(false);
  const [bell, setBell] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const nav = (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-4">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo YB COMPANY" width={36} height={36} className="size-9 rounded-lg" />
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold">YB COMPANY</span>
          <span className="block text-[10px] uppercase tracking-[0.2em] text-mist">Dashboard</span>
        </span>
      </Link>

      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-mist">{group.label}</p>
          <div className="mt-2 space-y-1">
            {group.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                onClick={() => setMobileNav(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-foreground/5 hover:text-foreground [&.active]:bg-foreground/10 [&.active]:font-medium [&.active]:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-auto flex items-center gap-3 rounded-xl p-3 glass-soft">
        <span className="grid size-9 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground gradient-brand">
          AS
        </span>
        <div className="text-xs">
          <p className="font-semibold">Amine Sadiki</p>
          <p className="text-mist">Administrateur</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-ink text-foreground">
      <div className="pointer-events-none fixed -top-24 -left-24 size-[36rem] rounded-full bg-primary/20 blur-[120px] glow-orb" />
      <div className="pointer-events-none fixed bottom-0 right-0 size-[30rem] rounded-full bg-accent/10 blur-[120px]" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-sidebar lg:block">{nav}</aside>

      {mobileNav && (
        <>
          <button
            type="button"
            aria-label="Fermer la navigation"
            className="fixed inset-0 z-40 bg-ink/70 lg:hidden"
            onClick={() => setMobileNav(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-sidebar lg:hidden">{nav}</aside>
        </>
      )}

      <div className="relative lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-ink/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <button
            type="button"
            aria-label="Ouvrir la navigation"
            onClick={() => setMobileNav(true)}
            className="grid size-9 place-items-center rounded-lg border border-border text-mist lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <p className="hidden text-xs text-mist sm:block">
            Mercredi 9 septembre · Temps réel sur 4 canaux connectés
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-mist hover:text-foreground"
            >
              Voir le site
            </Link>
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setBell((v) => !v)}
                className="grid size-9 place-items-center rounded-lg border border-border text-mist hover:text-foreground"
              >
                <Bell className="size-4" />
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                    {unread}
                  </span>
                )}
              </button>
              {bell && (
                <div className="absolute right-0 top-11 w-80 rounded-2xl p-3 glass">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold">Notifications</p>
                    <button
                      type="button"
                      aria-label="Fermer"
                      onClick={() => setBell(false)}
                      className="text-mist hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="max-h-80 space-y-2 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "rounded-xl border border-border p-3",
                          n.read ? "bg-foreground/[0.02]" : "bg-foreground/[0.06]",
                        )}
                      >
                        <p className="text-xs font-medium">{n.title}</p>
                        <p className="mt-0.5 text-[11px] text-mist">{n.detail}</p>
                        <p className="mt-1 text-[10px] text-mist">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
