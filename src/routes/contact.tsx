import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { company, faq } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contacter YB COMPANY — Casablanca" },
      {
        name: "description",
        content:
          "Contactez YB COMPANY à Casablanca : téléphone, WhatsApp, email et horaires. Nos équipes répondent à vos demandes de production textile, impression et communication visuelle.",
      },
      { property: "og:title", content: "Contacter YB COMPANY" },
      { property: "og:description", content: "Téléphone, WhatsApp, email et horaires de nos équipes à Casablanca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="rise mt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
        <h1 className="mt-2 max-w-[20ch] font-display text-4xl font-semibold sm:text-5xl">
          Parlons de votre production
        </h1>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {[
            { icon: Phone, label: "Téléphone", value: company.phone },
            { icon: Mail, label: "Email", value: company.email },
            { icon: MapPin, label: "Adresse", value: company.address },
            { icon: Clock, label: "Horaires", value: company.hours },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl p-5 glass">
              <c.icon className="size-5 text-accent" />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-mist">{c.label}</p>
              <p className="mt-1 text-sm">{c.value}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message envoyé", {
              description: "Votre message apparaît dans le dashboard YB COMPANY.",
            });
            (e.target as HTMLFormElement).reset();
          }}
          className="rounded-2xl p-5 glass"
        >
          <h2 className="font-display text-lg font-semibold">Écrire à l'équipe</h2>
          <div className="mt-4 space-y-3">
            <input
              required
              placeholder="Nom"
              className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
            />
            <textarea
              required
              rows={4}
              placeholder="Votre message"
              className="w-full rounded-lg border border-border bg-ink/40 px-3 py-2.5 text-sm outline-none placeholder:text-mist focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground gradient-brand"
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Questions fréquentes</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faq.map((f) => (
            <div key={f.q} className="rounded-2xl p-5 glass">
              <h3 className="text-sm font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-mist">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
