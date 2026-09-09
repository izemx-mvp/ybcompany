import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { services, type ServiceSlug } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/devis")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? (search.service as ServiceSlug) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Demande de devis — YB COMPANY" },
      {
        name: "description",
        content:
          "Décrivez votre projet textile, sublimation, impression, sacherie ou aménagement : le formulaire s'adapte au service choisi et votre demande arrive directement chez nos équipes.",
      },
      { property: "og:title", content: "Demande de devis YB COMPANY" },
      { property: "og:description", content: "Un formulaire intelligent adapté à chaque service de production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DevisPage,
});

const fieldClass =
  "w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-mist">{label}</span>
      {children}
    </label>
  );
}

function TextField({ label, placeholder, required }: { label: string; placeholder?: string; required?: boolean }) {
  return (
    <Field label={label}>
      <input className={fieldClass} placeholder={placeholder} required={required} />
    </Field>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <Field label={label}>
      <select className={cn(fieldClass, "text-foreground")} defaultValue="">
        <option value="" disabled>
          Sélectionner
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

function UploadField({ label }: { label: string }) {
  return (
    <Field label={label}>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-ink/30 px-3 py-4 text-sm text-mist hover:text-foreground">
        <Upload className="size-4" />
        Joindre un fichier (logo, visuel, plan, dossier technique)
        <input type="file" multiple className="hidden" />
      </label>
    </Field>
  );
}

function ServiceFields({ slug }: { slug: ServiceSlug }) {
  if (slug === "textile" || slug === "sublimation") {
    return (
      <>
        <TextField label="Type de produit" placeholder="T-shirt, maillot, hoodie, coussin…" />
        <TextField label="Quantité estimée" placeholder="Ex. 500 pièces" />
        <SelectField label="Cible" options={["Homme", "Femme", "Enfant", "Mixte"]} />
        <TextField label="Type de textile" placeholder="Coton, polyester, mesh…" />
        <TextField label="Personnalisation souhaitée" placeholder="Sublimation, broderie, sérigraphie…" />
        <TextField label="Tailles" placeholder="S à XXL, répartition…" />
        <TextField label="Couleurs" placeholder="Références Pantone si disponibles" />
        <TextField label="Date souhaitée" placeholder="Ex. 15 octobre" />
        <TextField label="Budget indicatif" placeholder="Ex. 80 000 MAD" />
        <div className="sm:col-span-2">
          <Field label="Décrivez votre besoin">
            <textarea rows={4} className={fieldClass} placeholder="Contexte, contraintes, finitions attendues…" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <UploadField label="Modèle, logo ou dossier technique" />
        </div>
      </>
    );
  }

  if (slug === "publicite" || slug === "impression") {
    return (
      <>
        <TextField label="Type de support" placeholder="Roll-up, bâche, enseigne, covering…" />
        <TextField label="Dimensions" placeholder="Ex. 3 x 2 m" />
        <TextField label="Quantité" placeholder="Ex. 12 supports" />
        <SelectField label="Utilisation" options={["Intérieure", "Extérieure", "Les deux"]} />
        <SelectField label="Besoin de pose" options={["Oui", "Non", "À définir"]} />
        <TextField label="Ville d'installation" placeholder="Casablanca, Rabat…" />
        <TextField label="Date souhaitée" placeholder="Ex. 20 septembre" />
        <TextField label="Budget indicatif" placeholder="Ex. 45 000 MAD" />
        <div className="sm:col-span-2">
          <UploadField label="Fichier graphique" />
        </div>
      </>
    );
  }

  if (slug === "sacherie") {
    return (
      <>
        <TextField label="Type de sac" placeholder="Tote bag, sac publicitaire, pochette…" />
        <TextField label="Matière" placeholder="Coton, non tissé, kraft…" />
        <TextField label="Dimensions" placeholder="Ex. 38 x 42 cm" />
        <TextField label="Quantité" placeholder="Ex. 1 000 pièces" />
        <TextField label="Type d'impression" placeholder="Sérigraphie, quadri, transfert…" />
        <TextField label="Couleurs" placeholder="Nombre de couleurs / références" />
        <TextField label="Date souhaitée" placeholder="Ex. 30 septembre" />
        <div className="sm:col-span-2">
          <UploadField label="Logo ou design" />
        </div>
      </>
    );
  }

  return (
    <>
      <TextField label="Type d'espace" placeholder="Boutique, showroom, stand, façade…" />
      <TextField label="Surface approximative" placeholder="Ex. 90 m²" />
      <TextField label="Ville" placeholder="Casablanca, Marrakech…" />
      <TextField label="Type de projet" placeholder="Aménagement, enseigne, signalétique…" />
      <TextField label="Date souhaitée" placeholder="Ex. novembre" />
      <TextField label="Budget estimé" placeholder="Ex. 150 000 MAD" />
      <div className="sm:col-span-2">
        <UploadField label="Photos ou plans" />
      </div>
    </>
  );
}

function DevisPage() {
  const search = Route.useSearch();
  const [slug, setSlug] = useState<ServiceSlug>(search.service ?? "textile");
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="rise mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Demande de devis</p>
        <h1 className="mt-2 max-w-[22ch] font-display text-4xl font-semibold sm:text-5xl">
          Décrivez votre projet, nous préparons la réponse
        </h1>
        <p className="mt-4 max-w-[60ch] text-sm text-mist">
          Le formulaire s'adapte au service choisi. Votre demande est transmise immédiatement à l'équipe
          commerciale et apparaît dans le dashboard YB COMPANY.
        </p>
      </section>

      {sent ? (
        <section className="mt-8 rounded-2xl p-10 text-center glass">
          <h2 className="font-display text-2xl font-semibold">Demande envoyée</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-mist">
            Merci. Un conseiller YB COMPANY revient vers vous avec une proposition adaptée à vos quantités et à
            votre calendrier. Les délais et les tarifs sont confirmés par notre équipe après étude du dossier.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 rounded-xl border border-border px-5 py-2.5 text-sm text-mist hover:text-foreground"
          >
            Envoyer une autre demande
          </button>
        </section>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Demande transmise", {
              description: "Elle apparaît maintenant dans le dashboard YB COMPANY.",
            });
          }}
          className="mt-8 space-y-4"
        >
          <div className="rounded-2xl p-6 glass">
            <h2 className="font-display text-lg font-semibold">Informations générales</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField label="Nom" placeholder="Votre nom" required />
              <TextField label="Entreprise" placeholder="Nom de l'entreprise" />
              <TextField label="Téléphone" placeholder="+212 …" required />
              <TextField label="WhatsApp" placeholder="+212 …" />
              <TextField label="Email" placeholder="vous@entreprise.ma" required />
              <TextField label="Ville" placeholder="Casablanca" />
            </div>
          </div>

          <div className="rounded-2xl p-6 glass">
            <h2 className="font-display text-lg font-semibold">Service recherché</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setSlug(s.slug)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                    s.slug === slug
                      ? "border-transparent text-primary-foreground gradient-brand"
                      : "border-border text-mist hover:text-foreground",
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 glass">
            <h2 className="font-display text-lg font-semibold">
              Détails — {services.find((s) => s.slug === slug)?.name}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ServiceFields slug={slug} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand sm:w-auto"
          >
            Envoyer ma demande
          </button>
        </form>
      )}
    </SiteLayout>
  );
}
