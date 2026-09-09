import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { company, images, keyFigures, realisations, services, strengths } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YB COMPANY — De l'idée à la production, à Casablanca" },
      {
        name: "description",
        content:
          "Textile, sublimation, impression grand format, sacherie, PLV et aménagement : YB COMPANY produit vos projets sur mesure à Casablanca, en petites et grandes séries.",
      },
      { property: "og:title", content: "YB COMPANY — De l'idée à la production" },
      {
        property: "og:description",
        content: "Production textile, sublimation, impression et communication visuelle au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="rise relative mt-6 overflow-hidden rounded-3xl border border-border">
        <img
          src={images.heroProduction}
          alt="Atelier de production textile et impression YB COMPANY à Casablanca"
          width={1920}
          height={1088}
          className="h-[420px] w-full object-cover sm:h-[560px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
            {company.city} · Production sur mesure
          </p>
          <h1 className="mt-3 max-w-[18ch] font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            De l'idée à la production, nous donnons vie à vos projets.
          </h1>
          <p className="mt-5 max-w-[52ch] text-sm text-mist sm:text-base">{company.subline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/devis"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand"
            >
              Demander un devis
            </Link>
            <a
              href="#assistant"
              className="rounded-xl border border-border bg-foreground/5 px-6 py-3 text-sm font-medium backdrop-blur-md"
            >
              Parler à notre assistant
            </a>
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Nos expertises</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Ce que nous produisons</h2>
          </div>
          <p className="text-sm text-mist">6 pôles · une seule chaîne de production</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/expertises/$slug"
              params={{ slug: s.slug }}
              className="rise group overflow-hidden rounded-2xl glass"
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={1024}
                height={768}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-mist">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {s.cta} <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POURQUOI */}
      <section className="mt-16 rounded-3xl p-6 glass sm:p-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Pourquoi YB COMPANY ?</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Une chaîne complète, de l'idée au rendu final
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {keyFigures.map((f) => (
                <div key={f.label} className="rounded-xl p-4 glass-soft">
                  <p className="font-display text-3xl font-semibold text-gradient-brand">{f.value}</p>
                  <p className="mt-1 text-xs text-mist">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
            {strengths.map((s) => (
              <div key={s.title} className="rounded-xl p-4 glass-soft">
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs text-mist">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REALISATIONS */}
      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Réalisations</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Aperçu de nos productions</h2>
          </div>
          <Link
            to="/realisations"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            Voir la galerie complète <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {realisations.slice(0, 3).map((r) => (
            <article key={r.id} className="overflow-hidden rounded-2xl glass">
              <img
                src={r.image}
                alt={r.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{r.category}</p>
                <h3 className="mt-2 font-display text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-mist">{r.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="assistant" className="mt-16 rounded-3xl p-8 text-center glass sm:p-12">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Un projet à produire ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
          Décrivez votre besoin en quelques minutes, ou posez directement vos questions à notre assistant —
          il prépare votre demande et peut réserver un rendez-vous avec l'équipe commerciale.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/devis"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand"
          >
            Demander un devis
          </Link>
          <Link
            to="/contact"
            className="rounded-xl border border-border bg-foreground/5 px-6 py-3 text-sm font-medium"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
