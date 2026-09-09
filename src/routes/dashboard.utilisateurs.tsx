import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { rolePermissions, teamUsers, type TeamUser } from "@/lib/data";
import { PageHead, Panel, PrimaryButton } from "@/components/dash/ui";

export const Route = createFileRoute("/dashboard/utilisateurs")({
  component: UsersPage,
});

const roles = Object.keys(rolePermissions) as TeamUser["role"][];

function UsersPage() {
  const [list, setList] = useState<TeamUser[]>(teamUsers);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead
        eyebrow="Configuration"
        title="Utilisateurs & rôles"
        subtitle="Qui accède à quoi dans le dashboard YB COMPANY."
        action={<PrimaryButton onClick={() => setOpen(true)}>Inviter un utilisateur</PrimaryButton>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-2">
          {list.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center gap-3 rounded-2xl p-4 glass">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground/10 text-xs font-semibold">
                {u.initials}
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="text-sm font-medium">{u.name}</p>
                <p className="text-xs text-mist">{u.email}</p>
              </div>
              <select
                value={u.role}
                onChange={(e) => {
                  const role = e.target.value as TeamUser["role"];
                  setList((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
                  toast.success("Rôle mis à jour", { description: role });
                }}
                className="rounded-lg border border-border bg-ink/40 px-3 py-2 text-xs outline-none focus:border-primary"
              >
                {roles.map((r) => (
                  <option key={r} className="bg-ink">
                    {r}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-mist">{u.lastSeen}</span>
            </div>
          ))}
        </div>

        <Panel title="Permissions par rôle">
          <div className="space-y-3">
            {roles.map((r) => (
              <div key={r} className="rounded-xl border border-border p-3">
                <p className="text-sm font-medium">{r}</p>
                <ul className="mt-2 space-y-1 text-xs text-mist">
                  {rolePermissions[r].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              toast.success("Invitation envoyée");
            }}
            className="w-full max-w-md rounded-2xl p-6 glass"
          >
            <h2 className="font-display text-xl font-semibold">Inviter un utilisateur</h2>
            <div className="mt-4 space-y-3">
              <input
                required
                placeholder="Nom complet"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <input
                required
                type="email"
                placeholder="Adresse email"
                className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
              />
              <select className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none focus:border-primary">
                {roles.map((r) => (
                  <option key={r} className="bg-ink">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-mist hover:text-foreground"
              >
                Annuler
              </button>
              <PrimaryButton type="submit">Envoyer l'invitation</PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
