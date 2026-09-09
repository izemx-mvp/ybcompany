import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { realisations, services } from "@/lib/data";

export const Route = createFileRoute("/expertises/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.service.name ?? "Expertise";
    const desc = loaderData?.service.short ?? "";
    return {
      meta: [
        { title: `${name} — YB COMPANY Casablanca` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — YB COMPANY` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ExpertisePage,
});

function ExpertisePage() {
  const { service } = Route.useLoaderData();
  const related = realisations.filter((r) =>
    service.slug === "textile"
      ? ["Textile", "Sportswear", "Mode"].includes(r.category)
      : service.slug === "publicite"
        ? ["Publicité", "Habillage véhicule", "Stands & PLV"].includes(r.category)
        : service.slug === "sacherie"
          ? r.category === "Sacs"
          : service.slug === "amenagement"
            ? ["Aménagement", "Stands & PLV"].includes(r.category)
            : service.slug === "impression"
              ? r.category === "Impression"
              : r.category === "Sublimation",
  );

  return (
    <SiteLayout>
      <section className="rise relative mt-6 overflow-hidden rounded-3xl border border-border">
        <img
          src={service.image}
          alt={service.name}
          width={1024}
          height={768}
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent">Expertise</p>
          <h1 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold sm:text-5xl">{service.name}</h1>
          <p className="mt-4 max-w-[60ch] text-sm text-mist sm:text-base">{service.description}</p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl p-6 glass lg:col-span-2">
          <h2 className="font-display text-xl font-semibold">Prestations couvertes</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.items.map((i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg p-3 text-sm glass-soft">
                <Check className="size-4 shrink-0 text-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-6 glass">
          <h2 className="font-display text-xl font-semibold">Lancer ce type de projet</h2>
          <p className="mt-2 text-sm text-mist">
            Notre équipe revient vers vous avec une proposition adaptée à vos quantités et à votre calendrier.
          </p>
          <Link
            to="/devis"
            search={{ service: service.slug }}
            className="mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand"
          >
            Demander un devis {service.name.toLowerCase()}
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold">Réalisations liées</h2>
            <Link to="/realisations" className="inline-flex items-center gap-1.5 text-sm text-accent">
              Toute la galerie <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <article key={r.id} className="overflow-hidden rounded-2xl glass">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{r.prestation}</p>
                  <h3 className="mt-2 font-display text-base font-semibold">{r.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
