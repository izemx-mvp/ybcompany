import { useEffect, useRef, useState } from "react";
import { MessageSquare, Paperclip, Send, X } from "lucide-react";
import logo from "@/assets/yb-logo.png";
import { company, faq, services } from "@/lib/data";

type Msg = { id: number; from: "ia" | "client"; text: string };

const quickReplies = [
  "Textile & confection",
  "Impression & publicité",
  "Sublimation",
  "Sacs personnalisés",
  "Aménagement",
  "Demander un devis",
  "Prendre rendez-vous",
  "Autre demande",
];

const escalation =
  "Cette demande nécessite une validation de notre équipe. Je peux récupérer vos informations afin qu'un conseiller YB COMPANY vous recontacte.";

const welcome =
  "Bonjour 👋 Bienvenue chez YB COMPANY. Je peux vous renseigner sur nos services, vous aider à préparer votre demande de devis ou réserver un rendez-vous avec notre équipe. Comment puis-je vous aider ?";

function answer(input: string): string {
  const t = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Jamais de prix ni de délai inventés.
  if (/(prix|tarif|cout|combien|budget|devis chiffre|delai|deadline|quand livr)/.test(t)) {
    return escalation;
  }
  if (/(rendez-vous|rdv|rencontrer|appel|visio)/.test(t)) {
    return "Avec plaisir. Nous proposons des rendez-vous par téléphone, en visioconférence ou dans nos locaux à Casablanca. Indiquez-moi votre nom, votre entreprise et vos disponibilités, et je réserve le créneau avec notre équipe commerciale.";
  }
  if (/(devis|commander|projet)/.test(t)) {
    return "Je peux préparer votre demande. Précisez le service concerné, le type de produit, la quantité estimée, la ville et la date souhaitée. Vous pouvez aussi joindre votre logo ou votre dossier technique.";
  }
  if (/(humain|conseiller|commercial|quelqu'un|parler a)/.test(t)) {
    return "Je transfère la conversation à un conseiller YB COMPANY. Laissez-moi votre téléphone ou votre email pour qu'il vous recontacte rapidement.";
  }
  if (/(horaire|ouvert|adresse|ou etes|localisation|contact|telephone|email)/.test(t)) {
    return `Nous sommes à ${company.address}. ${company.hours}. Téléphone : ${company.phone} · Email : ${company.email}.`;
  }
  if (/(english|hello|hi |thanks)/.test(t)) {
    return "Hello 👋 I can answer in English, French or Arabic. Which service are you interested in: textile, sublimation, printing, advertising, bags or fit-out?";
  }
  if (/(مرحبا|السلام|شكرا|كيف)/.test(input)) {
    return "مرحبا 👋 يمكنني مساعدتك بالعربية. ما هي الخدمة التي تهمك: النسيج، الطباعة، الإشهار، الأكياس أو التجهيز؟";
  }

  const match = services.find((s) => {
    const key = s.slug;
    if (key === "textile") return /(textile|vetement|habillement|maillot|sportswear|confection|collection)/.test(t);
    if (key === "sublimation") return /(sublimation|coussin|rideau|tissu imprime)/.test(t);
    if (key === "publicite") return /(publicit|plv|enseigne|roll|kakemono|stand|drapeau|vehicule|photocall|vitrine)/.test(t);
    if (key === "impression") return /(impression|imprim|bache|vinyle|affiche|brochure|grand format)/.test(t);
    if (key === "sacherie") return /(sac|sacherie|tote|pochette)/.test(t);
    return /(amenagement|totem|facade|interieur|exterieur|magasin|boutique)/.test(t);
  });
  if (match) {
    return `${match.name} : ${match.description} Nous couvrons notamment ${match.items.slice(0, 4).join(", ").toLowerCase()}. Quelle quantité et quelle date visez-vous ?`;
  }

  const f = faq.find((item) =>
    item.q
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .some((w) => w.length > 5 && t.includes(w)),
  );
  if (f) return f.a;

  return "Je peux vous renseigner sur le textile, la sublimation, l'impression, la publicité, la sacherie et l'aménagement. Décrivez votre projet en quelques mots (produit, quantité, ville, date souhaitée) et je prépare votre demande.";
}

export function AssistantChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, from: "ia", text: welcome }]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { id: m.length, from: "client", text: clean }]);
    setValue("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: m.length, from: "ia", text: answer(clean) }]);
      inputRef.current?.focus();
    }, 650);
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] gradient-brand"
        >
          <MessageSquare className="size-4" />
          Assistant YB COMPANY
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[520px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl glass">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <img src={logo} alt="" width={36} height={36} className="size-9 rounded-lg" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Assistant YB COMPANY</p>
              <p className="flex items-center gap-1.5 text-[11px] text-mist">
                <span className="size-1.5 rounded-full bg-success" /> En ligne · FR · العربية · EN
              </p>
            </div>
            <button
              type="button"
              aria-label="Fermer l'assistant"
              onClick={() => setOpen(false)}
              className="grid size-8 place-items-center rounded-lg text-mist hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.from === "ia"
                    ? "max-w-[90%] rounded-xl rounded-tl-sm border border-border bg-ink/50 p-3 text-sm leading-relaxed"
                    : "ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-primary p-3 text-sm text-primary-foreground"
                }
              >
                {m.text}
              </div>
            ))}
            {typing && <p className="text-xs text-mist">L'assistant rédige…</p>}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-border bg-foreground/5 px-2.5 py-1 text-[11px] text-mist hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <label className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-border text-mist hover:text-foreground">
              <Paperclip className="size-4" />
              <input type="file" className="hidden" />
              <span className="sr-only">Joindre un fichier, logo ou dossier technique</span>
            </label>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Écrivez votre demande…"
              className="min-w-0 flex-1 rounded-lg border border-border bg-ink/40 px-3 py-2 text-sm outline-none placeholder:text-mist focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-primary-foreground gradient-brand"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
