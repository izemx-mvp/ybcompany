import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { mediaLibrary, type MediaItem } from "@/lib/data";
import { EmptyState, FilterChips, PageHead, PrimaryButton } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/mediatheque")({
  component: MediaPage,
});

const filters = ["Tous", "Photos", "Vidéos", "Logos", "Réalisations", "Produits"] as const;

function MediaPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tous");
  const [preview, setPreview] = useState<MediaItem | null>(null);

  const filtered = useMemo(
    () => (filter === "Tous" ? mediaLibrary : mediaLibrary.filter((m) => m.type === filter)),
    [filter],
  );

  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Médiathèque"
        subtitle="Photos, réalisations et visuels réutilisables pour les publications."
        action={<PrimaryButton onClick={() => toast.success("Import de fichiers disponible")}>Importer</PrimaryButton>}
      />

      <div className="mb-4">
        <FilterChips options={filters} value={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Aucun média" text="Aucun fichier dans cette catégorie pour le moment." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {filtered.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setPreview(m)}
              className="overflow-hidden rounded-2xl text-left glass"
            >
              <img src={m.image} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-xs font-medium">{m.name}</p>
                <p className="text-[11px] text-mist">{m.type}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4" onClick={() => setPreview(null)}>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl glass" onClick={(e) => e.stopPropagation()}>
            <img src={preview.image} alt={preview.name} className="max-h-[65vh] w-full object-cover" />
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-display text-base font-semibold">{preview.name}</p>
                <p className="text-xs text-mist">{preview.type}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
