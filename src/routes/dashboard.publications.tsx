import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { socialPosts as seed, type PostStatus, type SocialPost } from "@/lib/data";
import { EmptyState, FilterChips, PageHead, PostStatusChip, PrimaryButton } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/publications")({
  component: PublicationsPage,
});

const filters = ["Toutes", "Brouillon", "À valider", "Validé", "Planifié", "Publié", "Erreur"] as const;

function PublicationsPage() {
  const [list, setList] = useState<SocialPost[]>(seed);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Toutes");

  const filtered = useMemo(
    () => (filter === "Toutes" ? list : list.filter((p) => p.status === filter)),
    [list, filter],
  );

  function setStatus(id: string, status: PostStatus, message: string) {
    setList((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    toast.success(message);
  }

  return (
    <>
      <PageHead
        eyebrow="Community Manager IA"
        title="Publications"
        subtitle="Validez, planifiez ou republiez les contenus proposés par l'IA."
      />

      <div className="mb-4">
        <FilterChips options={filters} value={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Aucune publication" text="Aucune publication ne correspond à ce statut." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl glass">
              <img src={p.image} alt={p.title} loading="lazy" className="h-40 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-mist">
                    {p.network} · {p.format}
                  </span>
                  <PostStatusChip status={p.status} />
                </div>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-mist">{p.caption}</p>
                <p className="mt-2 text-[11px] text-mist">
                  {p.date} à {p.hour}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.status === "À valider" && (
                    <PrimaryButton onClick={() => setStatus(p.id, "Validé", "Publication validée")}>
                      Valider
                    </PrimaryButton>
                  )}
                  {(p.status === "Validé" || p.status === "Brouillon") && (
                    <PrimaryButton onClick={() => setStatus(p.id, "Planifié", "Publication planifiée")}>
                      Planifier
                    </PrimaryButton>
                  )}
                  {p.status === "Erreur" && (
                    <PrimaryButton onClick={() => setStatus(p.id, "Planifié", "Nouvelle tentative programmée")}>
                      Republier
                    </PrimaryButton>
                  )}
                  <button
                    type="button"
                    onClick={() => toast.success("Contenu ouvert dans l'éditeur")}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-mist hover:text-foreground"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
