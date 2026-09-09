import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logo from "@/assets/yb-logo.png";
import { company, services } from "@/lib/data";
import { AssistantChat } from "@/components/site/AssistantChat";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/devis", label: "Demande de devis" },
  { to: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img src={logo} alt="Logo YB COMPANY" width={40} height={40} className="size-10 rounded-lg" />
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold tracking-wide">{company.name}</span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-mist">
          {company.city} · Production
        </span>
      </span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-foreground">
      <div className="pointer-events-none fixed -top-24 -left-24 size-[36rem] rounded-full bg-primary/20 blur-[120px] glow-orb" />
      <div className="pointer-events-none fixed top-1/3 -right-32 size-[30rem] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-5 sm:px-8">
        <header className="rise sticky top-4 z-40 flex items-center justify-between rounded-2xl px-4 py-3 glass">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-mist transition-colors hover:text-foreground [&.active]:bg-foreground/10 [&.active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/devis"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] sm:inline-flex gradient-brand"
            >
              Demander un devis
            </Link>
            <Link
              to="/dashboard"
              className="hidden rounded-xl border border-border px-3 py-2 text-xs font-medium text-mist hover:text-foreground lg:inline-flex"
            >
              Espace équipe
            </Link>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg border border-border text-mist md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </header>

        {open && (
          <div className="mt-2 rounded-2xl p-3 md:hidden glass">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-mist hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-mist hover:text-foreground"
            >
              Espace équipe
            </Link>
          </div>
        )}

        <main>{children}</main>

        <footer className="mt-16 mb-4 rounded-2xl p-6 glass sm:p-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-mist">{company.subline}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Expertises</h3>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/expertises/$slug"
                      params={{ slug: s.slug }}
                      className="hover:text-foreground"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                <li>{company.address}</li>
                <li>{company.phone}</li>
                <li>{company.email}</li>
                <li>{company.hours}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Démarrer un projet</h3>
              <p className="mt-3 text-sm text-mist">
                Décrivez votre besoin, notre équipe revient vers vous avec une proposition adaptée.
              </p>
              <Link
                to="/devis"
                className={cn(
                  "mt-4 inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground",
                  "gradient-brand shadow-[var(--shadow-brand)]",
                )}
              >
                Demander un devis
              </Link>
            </div>
          </div>
          <p className="mt-8 border-t border-border pt-4 text-xs text-mist">
            © {new Date().getFullYear()} {company.name} — Production textile, impression et communication visuelle
            à {company.city}.
          </p>
        </footer>
      </div>

      <AssistantChat />
    </div>
  );
}
