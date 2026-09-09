import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Send, Sparkle, UserRound } from "lucide-react";
import { toast } from "sonner";
import { conversations as seed, leads, type Conversation, type Message } from "@/lib/data";
import { ChannelChip, FilterChips, GhostButton, PageHead, StatusChip } from "@/components/dash/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/conversations")({
  component: ConversationsPage,
});

const filters = [
  "Tous",
  "Non lus",
  "IA",
  "Humain",
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Site web",
] as const;

function ConversationsPage() {
  const [list, setList] = useState<Conversation[]>(seed);
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tous");
  const [activeId, setActiveId] = useState(seed[0].id);
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");

  const filtered = useMemo(
    () =>
      list.filter((c) => {
        switch (filter) {
          case "Non lus":
            return c.unread;
          case "IA":
            return c.mode === "ia";
          case "Humain":
            return c.mode === "humain";
          case "WhatsApp":
            return c.channel === "whatsapp";
          case "Instagram":
            return c.channel === "instagram";
          case "Facebook":
            return c.channel === "facebook";
          case "Site web":
            return c.channel === "website";
          default:
            return true;
        }
      }),
    [list, filter],
  );

  const active = list.find((c) => c.id === activeId) ?? filtered[0] ?? list[0];
  const lead = leads.find((l) => l.id === active?.leadId);

  function update(id: string, patch: Partial<Conversation>) {
    setList((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text || !active) return;
    const msg: Message = { id: `n${active.messages.length}`, from: "agent", text, time: "à l'instant" };
    update(active.id, { messages: [...active.messages, msg], mode: "humain", unread: false });
    setDraft("");
  }

  return (
    <>
      <PageHead
        eyebrow="Service client"
        title="Conversations"
        subtitle="Une seule boîte de réception pour le site, WhatsApp, Instagram et Facebook."
      />

      <div className="mb-4">
        <FilterChips options={filters} value={filter} onChange={setFilter} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr_300px]">
        {/* Liste */}
        <div className="rounded-2xl p-2 glass">
          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-mist">Aucune conversation pour ce filtre.</p>
          )}
          <div className="space-y-1">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveId(c.id);
                  update(c.id, { unread: false });
                }}
                className={cn(
                  "w-full rounded-xl border border-transparent p-3 text-left transition-colors hover:bg-foreground/5",
                  c.id === active?.id && "border-border bg-foreground/10",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{c.contact}</span>
                  {c.unread && <span className="size-2 shrink-0 rounded-full bg-accent" />}
                </div>
                <p className="mt-1 truncate text-xs text-mist">{c.subject}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <ChannelChip channel={c.channel} />
                  <span className="text-[10px] text-mist">{c.lastAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        {active && (
          <div className="flex min-h-[560px] flex-col rounded-2xl glass">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
              <div>
                <p className="font-display text-base font-semibold">{active.contact}</p>
                <p className="text-xs text-mist">
                  {active.company} · {active.subject}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                    active.mode === "ia" ? "bg-success/15 text-success" : "bg-primary/20 text-primary",
                  )}
                >
                  {active.mode === "ia" ? <Sparkle className="size-3" /> : <UserRound className="size-3" />}
                  {active.mode === "ia" ? "Agent IA actif" : "Mode humain"}
                </span>
                {active.mode === "ia" ? (
                  <GhostButton
                    onClick={() => {
                      update(active.id, { mode: "humain" });
                      toast.success("Vous avez repris la conversation", {
                        description: "L'IA ne répond plus automatiquement sur ce fil.",
                      });
                    }}
                  >
                    Reprendre la conversation
                  </GhostButton>
                ) : (
                  <GhostButton
                    onClick={() => {
                      update(active.id, { mode: "ia" });
                      toast.success("Agent IA réactivé");
                    }}
                  >
                    Activer l'IA
                  </GhostButton>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[80%] rounded-xl p-3 text-sm",
                    m.from === "client"
                      ? "rounded-tl-sm border border-border bg-foreground/5"
                      : m.from === "ia"
                        ? "ml-auto rounded-tr-sm border border-accent/30 bg-accent/10"
                        : "ml-auto rounded-tr-sm bg-primary text-primary-foreground",
                  )}
                >
                  <p className="mb-1 text-[10px] uppercase tracking-[0.15em] opacity-70">
                    {m.from === "client" ? active.contact : m.from === "ia" ? "Agent IA" : "Conseiller"} · {m.time}
                  </p>
                  {m.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Répondre en tant que conseiller…"
                className="min-w-0 flex-1 rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                className="grid size-10 place-items-center rounded-lg text-primary-foreground gradient-brand"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        )}

        {/* Fiche prospect */}
        {active && lead && (
          <div className="space-y-4">
            <div className="rounded-2xl p-4 glass">
              <p className="font-display text-sm font-semibold">Fiche prospect</p>
              <dl className="mt-3 space-y-2 text-xs">
                {[
                  ["Nom", lead.name],
                  ["Entreprise", lead.company ?? "—"],
                  ["Téléphone", lead.phone],
                  ["Email", lead.email],
                  ["Service", lead.service],
                  ["Produit", lead.product],
                  ["Quantité", lead.quantity],
                  ["Budget", lead.budget],
                  ["Deadline", lead.deadline],
                  ["Ville", lead.city],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-mist">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusChip status={active.status} />
                <span className="text-[11px] text-mist">Responsable : {lead.owner}</span>
              </div>
              <p className="mt-3 rounded-lg border border-border p-3 text-xs text-mist">
                <span className="mb-1 block font-medium text-foreground">Résumé IA</span>
                {lead.summary}
              </p>
              {lead.documents.length > 0 && (
                <p className="mt-2 text-[11px] text-mist">Documents : {lead.documents.join(", ")}</p>
              )}
            </div>

            <div className="rounded-2xl p-4 glass">
              <p className="font-display text-sm font-semibold">Tags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.tags.length === 0 && <span className="text-xs text-mist">Aucun tag</span>}
                {active.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-mist">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 glass">
              <p className="font-display text-sm font-semibold">Notes internes</p>
              <div className="mt-2 space-y-2">
                {active.notes.map((n, i) => (
                  <p key={i} className="rounded-lg border border-border p-2 text-xs text-mist">
                    {n}
                  </p>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!note.trim()) return;
                  update(active.id, { notes: [...active.notes, note.trim()] });
                  setNote("");
                  toast.success("Note ajoutée");
                }}
                className="mt-3 space-y-2"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Ajouter une note…"
                  className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2 text-xs outline-none placeholder:text-mist focus:border-primary"
                />
                <GhostButton onClick={() => undefined} className="w-full">
                  <span onClick={() => undefined}>Enregistrer la note</span>
                </GhostButton>
                <button type="submit" className="hidden" aria-hidden />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
