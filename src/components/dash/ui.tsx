import type { ReactNode } from "react";
import { Facebook, Globe, Instagram, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Channel, LeadScore, LeadStatus, PostStatus } from "@/lib/data";
import { channelLabel } from "@/lib/data";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rise rounded-2xl p-4 glass", className)}>
      {(title || action) && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {title && <h2 className="font-display text-base font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHead({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rise mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-mist">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  positive,
}: {
  label: string;
  value: string;
  hint?: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl p-4 glass">
      <p className="text-xs text-mist">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {hint && <p className={cn("mt-1 text-xs", positive ? "font-medium text-success" : "text-mist")}>{hint}</p>}
    </div>
  );
}

const channelIcons = {
  website: Globe,
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
} as const;

export function ChannelChip({ channel, compact }: { channel: Channel; compact?: boolean }) {
  const Icon = channelIcons[channel];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-foreground/5 px-2 py-1 text-[11px] font-medium",
        channel === "whatsapp" && "text-success",
        channel === "instagram" && "text-chart-5",
        channel === "facebook" && "text-primary",
        channel === "website" && "text-mist",
      )}
    >
      <Icon className="size-3" />
      {!compact && channelLabel[channel]}
    </span>
  );
}

const statusTone: Record<LeadStatus, string> = {
  Nouveau: "bg-foreground/10 text-mist",
  "À qualifier": "bg-warning/15 text-warning",
  Qualifié: "bg-success/15 text-success",
  "RDV programmé": "bg-primary/20 text-primary",
  "Devis à préparer": "bg-accent/15 text-accent",
  "Devis envoyé": "bg-accent/15 text-accent",
  "En négociation": "bg-chart-5/20 text-chart-5",
  Gagné: "bg-success/20 text-success",
  Perdu: "bg-destructive/15 text-destructive",
};

export function StatusChip({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2 py-1 text-[10px] font-medium", statusTone[status])}>
      {status}
    </span>
  );
}

const scoreTone: Record<LeadScore, string> = {
  "Lead chaud": "bg-success/15 text-success",
  "Lead à suivre": "bg-warning/15 text-warning",
  "Demande informative": "bg-foreground/10 text-mist",
};

export function ScoreChip({ score }: { score: LeadScore }) {
  return (
    <span className={cn("inline-flex rounded-full px-2 py-1 text-[10px] font-medium", scoreTone[score])}>
      {score}
    </span>
  );
}

const postTone: Record<PostStatus, string> = {
  Brouillon: "bg-foreground/10 text-mist",
  "À valider": "bg-warning/15 text-warning",
  Validé: "bg-primary/20 text-primary",
  Planifié: "bg-accent/15 text-accent",
  Publié: "bg-success/15 text-success",
  Erreur: "bg-destructive/15 text-destructive",
};

export function PostStatusChip({ status }: { status: PostStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2 py-1 text-[10px] font-medium", postTone[status])}>
      {status}
    </span>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
            o === value
              ? "border-transparent bg-foreground/10 text-foreground"
              : "border-border text-mist hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <p className="font-display text-base font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-mist">{text}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium text-mist hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}
