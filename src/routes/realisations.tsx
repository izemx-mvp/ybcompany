import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { realisationCategories, realisations, type Realisation } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations YB COMPANY — textile, impression, stands et habillage" },
      {
        name: "description",
        content:
          "Galerie des productions YB COMPANY : maillots sublimés, stands de salon, habillage de véhicules, sacs personnalisés, enseignes et impression grand format.",
      },
      { property: "og:title", content: "Réalisations YB COMPANY" },
      {
        property: "og:description",
        content: "Nos productions textile, sublimation, impression, sacherie et aménagement au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RealisationsPage,
});

function RealisationsPage() {
  const [filter, setFilter] = useState<string>("Tous");
  const [selected, setSelected] = useState<Realisation | null>(null);

  const list = useMemo(
    () => (filter === "Tous" ? realisations : realisations.filter((r) => r.category === filter)),
    [filter],
  );

  return (
    <SiteLayout>
      <section className="rise mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Réalisations</p>
        <h1 className="mt-2 max-w-[20ch] font-display text-4xl font-semibold sm:text-5xl">
          Des projets produits, posés et livrés
        </h1>
        <p className="mt-4 max-w-[60ch] text-sm text-mist">
          Une sélection de productions récentes, du développement textile à l'installation sur site.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {realisationCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                c === filter
                  ? "border-transparent text-primary-foreground gradient-brand"
                  : "border-border text-mist hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <article key={r.id} className="rise overflow-hidden rounded-2xl glass">
            <img
              src={r.image}
              alt={r.title}
              loading="lazy"
              width={1024}
              height={768}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{r.category}</p>
                {r.client && <p className="text-[11px] text-mist">{r.client}</p>}
              </div>
              <h2 className="mt-2 font-display text-base font-semibold">{r.title}</h2>
              <p className="mt-1 text-xs text-mist">{r.prestation}</p>
              <p className="mt-2 text-sm text-mist">{r.description}</p>
              <button
                type="button"
                onClick={() => setSelected(r)}
                className="mt-4 text-sm font-medium text-accent hover:underline"
              >
                Réaliser un projet similaire →
              </button>
            </div>
          </article>
        ))}
      </section>

      {list.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-mist">
          Aucune réalisation publiée dans cette catégorie pour le moment.
        </p>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4">
          <div className="w-full max-w-lg rounded-2xl p-6 glass">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{selected.category}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{selected.title}</h2>
            <p className="mt-3 text-sm text-mist">{selected.description}</p>
            <p className="mt-3 text-sm text-mist">
              Nous pouvons produire un projet similaire selon vos quantités, vos matières et votre calendrier.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/devis"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground gradient-brand"
              >
                Demander un devis
              </Link>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-border px-5 py-2.5 text-sm text-mist hover:text-foreground"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
