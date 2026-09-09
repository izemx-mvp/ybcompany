import heroProduction from "@/assets/hero-production.jpg";
import expTextile from "@/assets/exp-textile.jpg";
import expSublimation from "@/assets/exp-sublimation.jpg";
import expPublicite from "@/assets/exp-publicite.jpg";
import expImpression from "@/assets/exp-impression.jpg";
import expSacherie from "@/assets/exp-sacherie.jpg";
import expAmenagement from "@/assets/exp-amenagement.jpg";
import realMaillots from "@/assets/real-maillots.jpg";
import realStand from "@/assets/real-stand.jpg";
import realVehicules from "@/assets/real-vehicules.jpg";
import realFacade from "@/assets/real-facade.jpg";

export const images = {
  heroProduction,
  expTextile,
  expSublimation,
  expPublicite,
  expImpression,
  expSacherie,
  expAmenagement,
  realMaillots,
  realStand,
  realVehicules,
  realFacade,
};

export const company = {
  name: "YB COMPANY",
  city: "Casablanca",
  baseline: "De l'idée à la production, nous donnons vie à vos projets.",
  subline:
    "Textile • Sublimation • Impression • Communication visuelle • Production sur mesure",
  phone: "+212 5 22 00 00 00",
  whatsapp: "+212 6 00 00 00 00",
  email: "contact@ybcompany.ma",
  address: "Zone industrielle, Casablanca, Maroc",
  hours: "Lundi au vendredi 8h30 – 18h30 · Samedi 9h – 13h",
};

export type ServiceSlug =
  | "textile"
  | "sublimation"
  | "publicite"
  | "impression"
  | "sacherie"
  | "amenagement";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  description: string;
  image: string;
  items: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "textile",
    name: "Textile & Habillement",
    short: "Production de vêtements mode, sportswear, casual wear et collections personnalisées.",
    description:
      "Nous accompagnons les marques et les entreprises de l'idée au produit fini : stylisme, modélisme, patronage, développement produit, échantillonnage, confection, sourcing matières et production en petites comme en grandes séries.",
    image: expTextile,
    items: [
      "Stylisme",
      "Modélisme",
      "Patronage",
      "Développement produit",
      "Échantillonnage",
      "Confection",
      "Sourcing matières",
      "Petites & grandes séries",
    ],
    cta: "Découvrir le textile",
  },
  {
    slug: "sublimation",
    name: "Sublimation",
    short: "Solutions de sublimation et impression textile personnalisée.",
    description:
      "Impression par sublimation haute définition sur textile et supports techniques : vêtements, sportswear, tissus, textiles de maison, coussins, rideaux et éléments décoratifs personnalisés.",
    image: expSublimation,
    items: [
      "Vêtements",
      "Sportswear",
      "Tissus au mètre",
      "Textiles de maison",
      "Coussins",
      "Rideaux",
      "Décoration personnalisée",
    ],
    cta: "Découvrir la sublimation",
  },
  {
    slug: "publicite",
    name: "Industrie publicitaire",
    short: "PLV, enseignes, stands et supports événementiels.",
    description:
      "Conception et fabrication de l'ensemble de vos supports de communication visuelle, de la PLV de comptoir à l'habillage complet d'un point de vente ou d'une flotte de véhicules.",
    image: expPublicite,
    items: [
      "PLV",
      "Panneaux",
      "Enseignes",
      "Roll-up",
      "Kakémono",
      "Beach flags",
      "Drapeaux",
      "Photocall",
      "Stands",
      "Palissades",
      "Habillage de vitrines",
      "Habillage de véhicules",
      "Supports événementiels",
    ],
    cta: "Découvrir la publicité",
  },
  {
    slug: "impression",
    name: "Impression",
    short: "Impression grand format et supports imprimés.",
    description:
      "Un parc machine grand format pour vos productions intérieures et extérieures, avec contrôle colorimétrique et finitions sur mesure.",
    image: expImpression,
    items: [
      "Impression grand format",
      "Bâche",
      "Vinyle",
      "One Way",
      "Papier",
      "Affiches",
      "Brochures",
      "Cartes",
      "Supports personnalisés",
    ],
    cta: "Découvrir l'impression",
  },
  {
    slug: "sacherie",
    name: "Sacherie",
    short: "Fabrication de sacs personnalisés, publicitaires et sur mesure.",
    description:
      "Fabrication de sacs en tissu, non tissé, coton, kraft ou matières techniques, dans les dimensions et les impressions de votre choix.",
    image: expSacherie,
    items: [
      "Sacs en tissu",
      "Sacs publicitaires",
      "Sacs sur mesure",
      "Coton, non tissé, kraft",
      "Sérigraphie & quadri",
      "Toutes tailles",
    ],
    cta: "Découvrir la sacherie",
  },
  {
    slug: "amenagement",
    name: "Aménagement & communication visuelle",
    short: "Stands, enseignes, totems et aménagement intérieur et extérieur.",
    description:
      "De l'étude à la pose : nous concevons et installons vos espaces commerciaux, stands, façades et signalétiques.",
    image: expAmenagement,
    items: [
      "Stands",
      "PLV",
      "Enseignes",
      "Totems",
      "Aménagement intérieur",
      "Aménagement extérieur",
      "Façades",
      "Solutions personnalisées",
    ],
    cta: "Découvrir l'aménagement",
  },
];

export const strengths = [
  { title: "Production sur mesure", text: "Chaque projet est développé selon votre cahier des charges." },
  { title: "Petites & grandes séries", text: "De l'échantillon unique à la production industrielle." },
  { title: "Accompagnement de A à Z", text: "Conseil, conception, production, finition et livraison." },
  { title: "Créativité & innovation", text: "Un bureau d'études qui propose des solutions concrètes." },
  { title: "Contrôle qualité", text: "Contrôle à chaque étape, du sourcing au conditionnement." },
  { title: "Réactivité", text: "Une réponse rapide sur chaque demande entrante." },
  { title: "Expertise industrielle", text: "Des équipes métiers sur toute la chaîne de production." },
  { title: "Production au Maroc", text: "Atelier et bureau intégrés à Casablanca." },
];

export const keyFigures = [
  { value: "1 200+", label: "Projets livrés" },
  { value: "72h", label: "Délai d'échantillon" },
  { value: "450+", label: "Partenaires B2B" },
  { value: "12", label: "Villes desservies" },
];

export const realisationCategories = [
  "Tous",
  "Textile",
  "Sportswear",
  "Mode",
  "Sublimation",
  "Sacs",
  "Publicité",
  "Stands & PLV",
  "Habillage véhicule",
  "Aménagement",
  "Impression",
] as const;

export type Realisation = {
  id: string;
  title: string;
  category: string;
  prestation: string;
  description: string;
  image: string;
  client?: string;
};

export const realisations: Realisation[] = [
  {
    id: "r1",
    title: "500 maillots sublimés pour un club sportif",
    category: "Sportswear",
    prestation: "Sublimation & confection",
    description:
      "Développement du patron, sublimation intégrale des pièces et confection de 500 maillots avec numérotation individuelle.",
    image: realMaillots,
  },
  {
    id: "r2",
    title: "Stand modulaire pour un salon professionnel",
    category: "Stands & PLV",
    prestation: "Conception, fabrication et pose",
    description:
      "Stand de 24 m² avec panneaux tissu rétroéclairés, comptoir d'accueil et signalétique suspendue, monté sur site.",
    image: realStand,
  },
  {
    id: "r3",
    title: "Habillage complet de 6 véhicules utilitaires",
    category: "Habillage véhicule",
    prestation: "Impression vinyle & pose",
    description:
      "Covering intégral d'une flotte de 6 utilitaires : découpe, impression vinyle coulé, laminage et pose en atelier.",
    image: realVehicules,
  },
  {
    id: "r4",
    title: "Bâche mesh grand format sur façade",
    category: "Impression",
    prestation: "Impression grand format & installation",
    description:
      "Impression d'une bâche mesh de 180 m² et installation sur structure façade avec nacelle et équipe habilitée.",
    image: realFacade,
  },
  {
    id: "r5",
    title: "Collection sportswear capsule",
    category: "Textile",
    prestation: "Développement produit & confection",
    description:
      "Développement d'une capsule de 6 pièces : sélection matières, patronage, échantillonnage puis série de 800 pièces.",
    image: expTextile,
  },
  {
    id: "r6",
    title: "1 000 sacs publicitaires en coton",
    category: "Sacs",
    prestation: "Sacherie & impression",
    description:
      "Fabrication de 1 000 sacs coton 140 g avec impression sérigraphique une couleur sur les deux faces.",
    image: expSacherie,
  },
  {
    id: "r7",
    title: "Enseigne lumineuse et habillage de vitrine",
    category: "Aménagement",
    prestation: "Enseigne, vitrophanie & pose",
    description:
      "Enseigne lettres boîtiers rétroéclairées, totem d'entrée et habillage de vitrine en vinyle dépoli.",
    image: expAmenagement,
  },
  {
    id: "r8",
    title: "Textiles de maison sublimés",
    category: "Sublimation",
    prestation: "Sublimation textile",
    description:
      "Production de coussins et rideaux sublimés à motifs sur mesure pour une collection décoration.",
    image: expSublimation,
  },
  {
    id: "r9",
    title: "PLV et supports événementiels",
    category: "Publicité",
    prestation: "PLV, roll-up & beach flags",
    description:
      "Kit événementiel complet : roll-up, kakémonos, beach flags et photocall livrés en 5 jours ouvrés.",
    image: expPublicite,
  },
];

/* ---------------------------------- CRM ---------------------------------- */

export type Channel = "website" | "whatsapp" | "instagram" | "facebook";

export const channelLabel: Record<Channel, string> = {
  website: "Site web",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
};

export const leadStatuses = [
  "Nouveau",
  "À qualifier",
  "Qualifié",
  "RDV programmé",
  "Devis à préparer",
  "Devis envoyé",
  "En négociation",
  "Gagné",
  "Perdu",
] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadScores = ["Lead chaud", "Lead à suivre", "Demande informative"] as const;
export type LeadScore = (typeof leadScores)[number];

export type Lead = {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  channel: Channel;
  service: string;
  product: string;
  quantity: string;
  budget: string;
  deadline: string;
  city: string;
  need: string;
  documents: string[];
  summary: string;
  status: LeadStatus;
  score: LeadScore;
  nextAction: string;
  createdAt: string;
  owner: string;
};

export const leads: Lead[] = [
  {
    id: "l1",
    name: "Karim El Amrani",
    company: "Atlas Sport Club",
    phone: "+212 661 22 44 08",
    email: "k.elamrani@atlassport.ma",
    channel: "whatsapp",
    service: "Textile",
    product: "Maillots sublimés",
    quantity: "500 pièces",
    budget: "80 000 – 110 000 MAD",
    deadline: "15 octobre",
    city: "Casablanca",
    need: "500 maillots personnalisés avec numérotation et logos sponsors, tailles enfant et adulte.",
    documents: ["logo-club.ai", "charte-couleurs.pdf"],
    summary:
      "Club sportif souhaitant 500 maillots sublimés avant le début de saison. Budget annoncé, décideur identifié, demande une visite d'atelier.",
    status: "Qualifié",
    score: "Lead chaud",
    nextAction: "Préparer le devis sublimation 500 pièces",
    createdAt: "2026-09-09T09:12:00Z",
    owner: "Amine S.",
  },
  {
    id: "l2",
    name: "Salma Bennani",
    company: "Maroc Events",
    phone: "+212 662 71 90 33",
    email: "s.bennani@marocevents.ma",
    channel: "instagram",
    service: "Aménagement",
    product: "Stand salon 3x3 m",
    quantity: "1 stand",
    budget: "Non communiqué",
    deadline: "Mars",
    city: "Casablanca",
    need: "Stand 3x3 m pour un salon B2B, avec comptoir, panneaux tissu et écran.",
    documents: [],
    summary:
      "Agence événementielle en repérage pour un stand de salon. Budget non communiqué, décision dans 3 semaines.",
    status: "À qualifier",
    score: "Lead à suivre",
    nextAction: "Rappeler pour cadrer le budget",
    createdAt: "2026-09-09T08:05:00Z",
    owner: "Amine S.",
  },
  {
    id: "l3",
    name: "Youssef Cherkaoui",
    company: "Cina Distribution",
    phone: "+212 663 10 55 27",
    email: "y.cherkaoui@cina.ma",
    channel: "website",
    service: "Sacherie",
    product: "Sacs publicitaires coton",
    quantity: "1 000 pièces",
    budget: "35 000 MAD",
    deadline: "30 septembre",
    city: "Rabat",
    need: "1 000 sacs coton avec logo une couleur, deux faces.",
    documents: ["logo-cina.pdf"],
    summary:
      "Demande claire et chiffrée, prêt à valider un devis cette semaine. Livraison souhaitée à Rabat.",
    status: "Devis à préparer",
    score: "Lead chaud",
    nextAction: "Envoyer le devis sacherie",
    createdAt: "2026-09-08T16:42:00Z",
    owner: "Nadia R.",
  },
  {
    id: "l4",
    name: "Hicham Tazi",
    company: "Trans Auto SARL",
    phone: "+212 665 44 12 76",
    email: "h.tazi@transauto.ma",
    channel: "facebook",
    service: "Publicité",
    product: "Habillage de véhicules",
    quantity: "6 véhicules",
    budget: "60 000 MAD",
    deadline: "Fin du mois",
    city: "Mohammedia",
    need: "Covering intégral de 6 utilitaires, pose incluse.",
    documents: ["visuel-flotte.pdf"],
    summary:
      "Flotte de 6 utilitaires à habiller. Visuels fournis, attend une visite technique avant validation.",
    status: "RDV programmé",
    score: "Lead chaud",
    nextAction: "Visio technique jeudi 10:00",
    createdAt: "2026-09-08T09:15:00Z",
    owner: "Amine S.",
  },
  {
    id: "l5",
    name: "Imane Ouazzani",
    company: "Studio Nour",
    phone: "+212 668 33 21 09",
    email: "imane@studionour.ma",
    channel: "website",
    service: "Sublimation",
    product: "Coussins & rideaux sublimés",
    quantity: "250 pièces",
    budget: "À définir",
    deadline: "Novembre",
    city: "Marrakech",
    need: "Collection déco sublimée à partir de motifs maison.",
    documents: ["motifs-collection.zip"],
    summary:
      "Créatrice déco préparant une collection. Motifs prêts, besoin d'un échantillon avant série.",
    status: "Nouveau",
    score: "Lead à suivre",
    nextAction: "Proposer un échantillonnage",
    createdAt: "2026-09-07T14:20:00Z",
    owner: "Nadia R.",
  },
  {
    id: "l6",
    name: "Omar Fassi",
    company: "Groupe Riad Retail",
    phone: "+212 660 78 45 12",
    email: "o.fassi@riadretail.ma",
    channel: "whatsapp",
    service: "Impression",
    product: "Bâche mesh façade",
    quantity: "180 m²",
    budget: "45 000 MAD",
    deadline: "20 septembre",
    city: "Casablanca",
    need: "Impression grand format pour une façade de magasin, pose comprise.",
    documents: ["plan-facade.pdf"],
    summary: "Projet façade urgent avec plan fourni. Demande une pose sous 10 jours.",
    status: "Devis envoyé",
    score: "Lead chaud",
    nextAction: "Relancer sur le devis du 6 septembre",
    createdAt: "2026-09-06T11:02:00Z",
    owner: "Amine S.",
  },
];

export type Message = {
  id: string;
  from: "client" | "ia" | "agent";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  leadId: string;
  channel: Channel;
  contact: string;
  company?: string;
  subject: string;
  unread: boolean;
  mode: "ia" | "humain";
  status: LeadStatus;
  lastAt: string;
  tags: string[];
  notes: string[];
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    leadId: "l1",
    channel: "whatsapp",
    contact: "Karim El Amrani",
    company: "Atlas Sport Club",
    subject: "500 maillots personnalisés",
    unread: true,
    mode: "ia",
    status: "Qualifié",
    lastAt: "Aujourd'hui 10:24",
    tags: ["Textile", "Sublimation", "Urgent"],
    notes: ["Club fidèle depuis 2 saisons — prévoir une remise volume."],
    messages: [
      { id: "m1", from: "client", text: "Bonjour, quel délai pour 500 maillots sublimés ?", time: "10:02" },
      {
        id: "m2",
        from: "ia",
        text: "Bonjour 👋 Bienvenue chez YB COMPANY. Pour 500 maillots sublimés, je récupère quelques informations : avez-vous déjà un visuel et une répartition des tailles ?",
        time: "10:02",
      },
      { id: "m3", from: "client", text: "Oui, le logo est prêt. Tailles enfant et adulte, avec numéros.", time: "10:09" },
      {
        id: "m4",
        from: "ia",
        text: "Parfait. Le délai de production dépend de la validation de l'échantillon : cette demande nécessite une validation de notre équipe. Je peux récupérer vos informations afin qu'un conseiller YB COMPANY vous recontacte.",
        time: "10:10",
      },
      { id: "m5", from: "client", text: "Très bien, on vise la mi-octobre. Budget autour de 100 000 MAD.", time: "10:24" },
    ],
  },
  {
    id: "c2",
    leadId: "l2",
    channel: "instagram",
    contact: "Salma Bennani",
    company: "Maroc Events",
    subject: "Stand 3x3 m salon B2B",
    unread: true,
    mode: "ia",
    status: "À qualifier",
    lastAt: "Aujourd'hui 09:41",
    tags: ["Aménagement"],
    notes: [],
    messages: [
      { id: "m1", from: "client", text: "Bonjour, vous faites des stands pour les salons ?", time: "09:30" },
      {
        id: "m2",
        from: "ia",
        text: "Oui, nous concevons, fabriquons et posons les stands. Quelle surface et quelle date de salon visez-vous ?",
        time: "09:30",
      },
      { id: "m3", from: "client", text: "3x3 m, en mars, à Casablanca.", time: "09:41" },
    ],
  },
  {
    id: "c3",
    leadId: "l3",
    channel: "website",
    contact: "Youssef Cherkaoui",
    company: "Cina Distribution",
    subject: "1 000 sacs publicitaires",
    unread: false,
    mode: "humain",
    status: "Devis à préparer",
    lastAt: "Hier 16:42",
    tags: ["Sacherie", "Devis"],
    notes: ["Logo reçu au format vectoriel — impression 1 couleur 2 faces."],
    messages: [
      { id: "m1", from: "client", text: "Je souhaite 1 000 sacs coton avec notre logo.", time: "16:10" },
      {
        id: "m2",
        from: "ia",
        text: "Très bien. Quelle matière et quelles dimensions souhaitez-vous, et pour quelle date ?",
        time: "16:10",
      },
      { id: "m3", from: "client", text: "Coton 140 g, 38x42 cm, avant le 30 septembre.", time: "16:22" },
      { id: "m4", from: "agent", text: "Bonjour, Nadia de YB COMPANY. Je reprends la conversation, votre devis part demain matin.", time: "16:42" },
    ],
  },
  {
    id: "c4",
    leadId: "l4",
    channel: "facebook",
    contact: "Hicham Tazi",
    company: "Trans Auto SARL",
    subject: "Habillage de 6 véhicules",
    unread: false,
    mode: "humain",
    status: "RDV programmé",
    lastAt: "Hier 09:15",
    tags: ["Publicité", "Pose"],
    notes: ["Visite technique nécessaire avant chiffrage définitif."],
    messages: [
      { id: "m1", from: "client", text: "Bonjour, covering complet pour 6 utilitaires, c'est possible ?", time: "08:50" },
      { id: "m2", from: "ia", text: "Oui, nous réalisons le covering intégral avec pose en atelier. Dans quelle ville se trouve la flotte ?", time: "08:50" },
      { id: "m3", from: "client", text: "Mohammedia.", time: "09:00" },
      { id: "m4", from: "agent", text: "Je vous propose une visio jeudi à 10h pour cadrer la pose.", time: "09:15" },
    ],
  },
  {
    id: "c5",
    leadId: "l5",
    channel: "website",
    contact: "Imane Ouazzani",
    company: "Studio Nour",
    subject: "Coussins & rideaux sublimés",
    unread: false,
    mode: "ia",
    status: "Nouveau",
    lastAt: "Lundi 14:20",
    tags: ["Sublimation", "Échantillon"],
    notes: [],
    messages: [
      { id: "m1", from: "client", text: "Faites-vous de la sublimation sur textile de maison ?", time: "14:12" },
      { id: "m2", from: "ia", text: "Oui : coussins, rideaux, tissus au mètre et éléments décoratifs. Souhaitez-vous un échantillon avant série ?", time: "14:13" },
      { id: "m3", from: "client", text: "Oui, j'envoie mes motifs.", time: "14:20" },
    ],
  },
];

export type Appointment = {
  id: string;
  title: string;
  contact: string;
  company: string;
  type: "Téléphone" | "Visioconférence" | "Rendez-vous physique";
  date: string;
  day: string;
  hour: string;
  status: "Confirmé" | "En attente";
  owner: string;
};

export const appointments: Appointment[] = [
  {
    id: "a1",
    title: "Habillage de 6 véhicules",
    contact: "Hicham Tazi",
    company: "Trans Auto SARL",
    type: "Visioconférence",
    date: "Jeudi 10 septembre",
    day: "Jeu 10",
    hour: "10:00",
    status: "Confirmé",
    owner: "Amine S.",
  },
  {
    id: "a2",
    title: "Collection sportswear",
    contact: "Karim El Amrani",
    company: "Atlas Sport Club",
    type: "Rendez-vous physique",
    date: "Vendredi 11 septembre",
    day: "Ven 11",
    hour: "14:30",
    status: "Confirmé",
    owner: "Amine S.",
  },
  {
    id: "a3",
    title: "Sacs publicitaires — validation BAT",
    contact: "Youssef Cherkaoui",
    company: "Cina Distribution",
    type: "Téléphone",
    date: "Lundi 14 septembre",
    day: "Lun 14",
    hour: "09:30",
    status: "En attente",
    owner: "Nadia R.",
  },
  {
    id: "a4",
    title: "Échantillonnage déco sublimée",
    contact: "Imane Ouazzani",
    company: "Studio Nour",
    type: "Visioconférence",
    date: "Mardi 15 septembre",
    day: "Mar 15",
    hour: "11:00",
    status: "En attente",
    owner: "Nadia R.",
  },
];

export type QuoteRequest = {
  id: string;
  reference: string;
  contact: string;
  company: string;
  service: string;
  detail: string;
  quantity: string;
  budget: string;
  city: string;
  deadline: string;
  channel: Channel;
  status: LeadStatus;
  createdAt: string;
};

export const quoteRequests: QuoteRequest[] = [
  {
    id: "q1",
    reference: "DEV-2609-014",
    contact: "Karim El Amrani",
    company: "Atlas Sport Club",
    service: "Textile",
    detail: "500 maillots sublimés avec numérotation",
    quantity: "500",
    budget: "80 000 – 110 000 MAD",
    city: "Casablanca",
    deadline: "15 octobre",
    channel: "whatsapp",
    status: "Devis à préparer",
    createdAt: "09/09/2026",
  },
  {
    id: "q2",
    reference: "DEV-2609-013",
    contact: "Youssef Cherkaoui",
    company: "Cina Distribution",
    service: "Sacherie",
    detail: "1 000 sacs coton 140 g, impression 1 couleur",
    quantity: "1 000",
    budget: "35 000 MAD",
    city: "Rabat",
    deadline: "30 septembre",
    channel: "website",
    status: "Devis à préparer",
    createdAt: "08/09/2026",
  },
  {
    id: "q3",
    reference: "DEV-2609-011",
    contact: "Omar Fassi",
    company: "Groupe Riad Retail",
    service: "Impression",
    detail: "Bâche mesh 180 m² + pose façade",
    quantity: "180 m²",
    budget: "45 000 MAD",
    city: "Casablanca",
    deadline: "20 septembre",
    channel: "whatsapp",
    status: "Devis envoyé",
    createdAt: "06/09/2026",
  },
  {
    id: "q4",
    reference: "DEV-2609-009",
    contact: "Salma Bennani",
    company: "Maroc Events",
    service: "Aménagement",
    detail: "Stand 3x3 m pour salon professionnel",
    quantity: "1 stand",
    budget: "Non communiqué",
    city: "Casablanca",
    deadline: "Mars",
    channel: "instagram",
    status: "À qualifier",
    createdAt: "05/09/2026",
  },
  {
    id: "q5",
    reference: "DEV-2609-007",
    contact: "Hicham Tazi",
    company: "Trans Auto SARL",
    service: "Publicité",
    detail: "Habillage intégral de 6 utilitaires",
    quantity: "6",
    budget: "60 000 MAD",
    city: "Mohammedia",
    deadline: "Fin du mois",
    channel: "facebook",
    status: "En négociation",
    createdAt: "03/09/2026",
  },
];

/* -------------------------------- Dashboard ------------------------------- */

export const kpis = [
  { label: "Nouveaux prospects", value: "24", hint: "+ 8 vs hier", positive: true },
  { label: "Conversations aujourd'hui", value: "63", hint: "18 transférées à un humain" },
  { label: "Demandes de devis", value: "12", hint: "5 qualifiées par l'IA" },
  { label: "Rendez-vous programmés", value: "7", hint: "2 aujourd'hui" },
  { label: "Conversations IA", value: "41", hint: "automatisées" },
  { label: "Transférées à un humain", value: "12", hint: "à qualifier" },
  { label: "Leads qualifiés", value: "28", hint: "score chaud", positive: true },
  { label: "Publications planifiées", value: "6", hint: "2 à valider" },
];

export const requestsByPeriod = [
  { period: "Sem. 32", demandes: 18, rdv: 4 },
  { period: "Sem. 33", demandes: 24, rdv: 6 },
  { period: "Sem. 34", demandes: 21, rdv: 5 },
  { period: "Sem. 35", demandes: 32, rdv: 9 },
  { period: "Sem. 36", demandes: 28, rdv: 7 },
  { period: "Sem. 37", demandes: 37, rdv: 11 },
];

export const requestsByService = [
  { service: "Textile", value: 38 },
  { service: "Publicité", value: 27 },
  { service: "Sublimation", value: 24 },
  { service: "Sacherie", value: 19 },
  { service: "Impression", value: 15 },
  { service: "Aménagement", value: 9 },
];

/* --------------------------- Community Manager IA -------------------------- */

export const contentNetworks = ["Instagram", "Facebook", "LinkedIn"] as const;
export const contentObjectives = [
  "Notoriété",
  "Engagement",
  "Prospection",
  "Présentation produit",
  "Présentation réalisation",
  "Éducation",
  "Promotion",
  "Coulisses",
  "Expertise YB COMPANY",
] as const;
export const contentFormats = ["Post", "Carrousel", "Reel", "Story", "LinkedIn"] as const;
export const contentServices = [
  "Textile",
  "Sportswear",
  "Mode",
  "Sublimation",
  "Publicité",
  "Impression",
  "Sacherie",
  "Aménagement",
] as const;
export const contentTones = [
  "Professionnel",
  "Premium",
  "Commercial",
  "Créatif",
  "Corporate",
  "Dynamique",
  "Éducatif",
] as const;
export const contentLanguages = ["Français", "Arabe", "Anglais"] as const;

export type ContentIdea = {
  id: string;
  title: string;
  concept: string;
  hook: string;
  objective: string;
  network: string;
  format: string;
  service: string;
};

export const contentIdeas: ContentIdea[] = [
  {
    id: "i1",
    title: "Le parcours d'un maillot, de l'idée au terrain",
    concept:
      "Suivre les étapes de production d'un maillot sublimé : patron, impression, confection, contrôle qualité.",
    hook: "Un maillot, 6 étapes, un seul atelier.",
    objective: "Coulisses",
    network: "Instagram",
    format: "Reel",
    service: "Sportswear",
  },
  {
    id: "i2",
    title: "Avant / après : une façade transformée",
    concept: "Comparer la façade avant pose et après installation de la bâche grand format.",
    hook: "48 heures pour changer l'image d'un point de vente.",
    objective: "Présentation réalisation",
    network: "Instagram",
    format: "Carrousel",
    service: "Impression",
  },
  {
    id: "i3",
    title: "Comment choisir la matière de vos sacs personnalisés",
    concept: "Comparer coton, non tissé et kraft selon l'usage, le budget et la durabilité.",
    hook: "Coton, non tissé ou kraft : lequel pour votre marque ?",
    objective: "Éducation",
    network: "LinkedIn",
    format: "LinkedIn",
    service: "Sacherie",
  },
  {
    id: "i4",
    title: "Un stand monté en une journée",
    concept: "Timelapse du montage d'un stand modulaire sur un salon professionnel.",
    hook: "De la caisse au stand fini en 8 heures.",
    objective: "Expertise YB COMPANY",
    network: "Instagram",
    format: "Reel",
    service: "Aménagement",
  },
  {
    id: "i5",
    title: "3 signes qu'il est temps d'habiller votre flotte",
    concept: "Argumentaire court sur la visibilité générée par le covering de véhicules.",
    hook: "Vos véhicules roulent déjà. Font-ils votre publicité ?",
    objective: "Prospection",
    network: "LinkedIn",
    format: "Post",
    service: "Publicité",
  },
  {
    id: "i6",
    title: "La sublimation expliquée en 30 secondes",
    concept: "Gros plan sur la presse et le transfert des couleurs sur le textile.",
    hook: "La couleur entre dans la fibre, elle ne se pose pas dessus.",
    objective: "Éducation",
    network: "Instagram",
    format: "Story",
    service: "Sublimation",
  },
  {
    id: "i7",
    title: "Petite série, même exigence",
    concept: "Mettre en avant la capacité à produire 50 pièces avec le même contrôle qualité.",
    hook: "50 pièces ou 5 000 : le même atelier, le même contrôle.",
    objective: "Notoriété",
    network: "Facebook",
    format: "Post",
    service: "Textile",
  },
  {
    id: "i8",
    title: "Le carnet de tendances mode de la saison",
    concept: "Sélection de matières et de coupes travaillées en atelier cette saison.",
    hook: "Ce que nous coupons en ce moment.",
    objective: "Engagement",
    network: "Instagram",
    format: "Carrousel",
    service: "Mode",
  },
];

export type PostStatus = "Brouillon" | "À valider" | "Validé" | "Planifié" | "Publié" | "Erreur";

export type SocialPost = {
  id: string;
  title: string;
  network: string;
  format: string;
  status: PostStatus;
  date: string;
  hour: string;
  image: string;
  caption: string;
};

export const socialPosts: SocialPost[] = [
  {
    id: "p1",
    title: "Coulisses · production sublimation",
    network: "Instagram",
    format: "Reel",
    status: "Planifié",
    date: "2026-09-10",
    hour: "18:00",
    image: expSublimation,
    caption:
      "La couleur ne se pose pas sur le tissu : elle entre dans la fibre. Retour sur une journée de production sublimation dans notre atelier de Casablanca.",
  },
  {
    id: "p2",
    title: "Réalisations · enseigne façade",
    network: "LinkedIn",
    format: "Carrousel",
    status: "À valider",
    date: "2026-09-11",
    hour: "09:00",
    image: expAmenagement,
    caption:
      "Une enseigne lumineuse, un totem et un habillage de vitrine : la nouvelle identité d'un point de vente, conçue et posée par nos équipes.",
  },
  {
    id: "p3",
    title: "1 000 sacs coton livrés",
    network: "Instagram",
    format: "Post",
    status: "Publié",
    date: "2026-09-05",
    hour: "12:30",
    image: expSacherie,
    caption: "1 000 sacs coton personnalisés, imprimés et livrés. Sacherie sur mesure, du gabarit au conditionnement.",
  },
  {
    id: "p4",
    title: "Flotte habillée en 4 jours",
    network: "Facebook",
    format: "Post",
    status: "Brouillon",
    date: "2026-09-12",
    hour: "17:00",
    image: realVehicules,
    caption: "Six utilitaires, un covering intégral, une identité visible sur toutes les routes.",
  },
  {
    id: "p5",
    title: "Montage de stand en timelapse",
    network: "Instagram",
    format: "Reel",
    status: "Planifié",
    date: "2026-09-15",
    hour: "11:00",
    image: realStand,
    caption: "De la caisse au stand fini : 8 heures de montage résumées en 30 secondes.",
  },
  {
    id: "p6",
    title: "Capsule sportswear",
    network: "LinkedIn",
    format: "Post",
    status: "Erreur",
    date: "2026-09-08",
    hour: "08:30",
    image: realMaillots,
    caption: "Six pièces développées de la sélection matière à la série de 800 pièces.",
  },
];

export type MediaItem = {
  id: string;
  name: string;
  type: "Photos" | "Vidéos" | "Logos" | "Réalisations" | "Produits";
  image: string;
};

export const mediaLibrary: MediaItem[] = [
  { id: "md1", name: "Atelier — presse sublimation", type: "Photos", image: expSublimation },
  { id: "md2", name: "Maillots club — série 500", type: "Réalisations", image: realMaillots },
  { id: "md3", name: "Stand salon 24 m²", type: "Réalisations", image: realStand },
  { id: "md4", name: "Flotte utilitaires habillée", type: "Réalisations", image: realVehicules },
  { id: "md5", name: "Bâche mesh façade", type: "Réalisations", image: realFacade },
  { id: "md6", name: "Sacs coton personnalisés", type: "Produits", image: expSacherie },
  { id: "md7", name: "Table de coupe textile", type: "Photos", image: expTextile },
  { id: "md8", name: "Impression grand format", type: "Photos", image: expImpression },
  { id: "md9", name: "Enseigne & vitrine", type: "Réalisations", image: expAmenagement },
  { id: "md10", name: "PLV événementielle", type: "Produits", image: expPublicite },
  { id: "md11", name: "Vue générale atelier", type: "Photos", image: heroProduction },
];

export type KnowledgeSource = {
  id: string;
  name: string;
  type: "PDF" | "Word" | "FAQ" | "Texte" | "Page du site" | "Catalogue" | "Fiche produit" | "Conditions commerciales";
  addedAt: string;
  active: boolean;
  syncedAt: string;
};

export const knowledgeSources: KnowledgeSource[] = [
  { id: "k1", name: "Présentation YB COMPANY 2026", type: "PDF", addedAt: "12/08/2026", active: true, syncedAt: "Hier 22:00" },
  { id: "k2", name: "Catalogue sacherie", type: "Catalogue", addedAt: "20/08/2026", active: true, syncedAt: "Hier 22:00" },
  { id: "k3", name: "FAQ service client", type: "FAQ", addedAt: "02/09/2026", active: true, syncedAt: "Aujourd'hui 06:00" },
  { id: "k4", name: "Conditions commerciales B2B", type: "Conditions commerciales", addedAt: "02/09/2026", active: true, syncedAt: "Aujourd'hui 06:00" },
  { id: "k5", name: "Fiches produits sublimation", type: "Fiche produit", addedAt: "03/09/2026", active: true, syncedAt: "Hier 22:00" },
  { id: "k6", name: "Pages du site — Expertises", type: "Page du site", addedAt: "04/09/2026", active: true, syncedAt: "Aujourd'hui 06:00" },
  { id: "k7", name: "Procédure d'échantillonnage", type: "Word", addedAt: "05/09/2026", active: false, syncedAt: "05/09/2026" },
];

export type Integration = {
  id: string;
  name: string;
  description: string;
  connected: boolean;
};

export const integrations: Integration[] = [
  { id: "whatsapp", name: "WhatsApp Business", description: "Conversations et notifications sur WhatsApp.", connected: true },
  { id: "instagram", name: "Instagram", description: "Messages directs, commentaires et publication.", connected: true },
  { id: "facebook", name: "Facebook", description: "Messenger, commentaires et publication de pages.", connected: true },
  { id: "linkedin", name: "LinkedIn", description: "Publication de contenus entreprise.", connected: false },
  { id: "google-calendar", name: "Google Calendar", description: "Synchronisation des rendez-vous commerciaux.", connected: true },
  { id: "email", name: "Email", description: "Confirmations, rappels et notifications équipe.", connected: true },
  { id: "tiktok", name: "TikTok", description: "Connecteur prévu, API non disponible pour ce compte.", connected: false },
];

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  role: "Administrateur" | "Commercial / Service client" | "Community Manager";
  initials: string;
  lastSeen: string;
};

export const teamUsers: TeamUser[] = [
  { id: "u1", name: "Amine Sadiki", email: "amine@ybcompany.ma", role: "Administrateur", initials: "AS", lastSeen: "En ligne" },
  { id: "u2", name: "Nadia Rachidi", email: "nadia@ybcompany.ma", role: "Commercial / Service client", initials: "NR", lastSeen: "Il y a 12 min" },
  { id: "u3", name: "Yassine Bahri", email: "yassine@ybcompany.ma", role: "Commercial / Service client", initials: "YB", lastSeen: "Il y a 1 h" },
  { id: "u4", name: "Lina Chafik", email: "lina@ybcompany.ma", role: "Community Manager", initials: "LC", lastSeen: "Hier" },
];

export const rolePermissions: Record<TeamUser["role"], string[]> = {
  Administrateur: ["Accès complet à la plateforme", "Gestion des utilisateurs", "Configuration & intégrations"],
  "Commercial / Service client": ["Conversations", "Prospects", "Rendez-vous", "Demandes & devis"],
  "Community Manager": ["Idées de contenus", "Création de contenu", "Calendrier", "Publications", "Médiathèque", "Analyse"],
};

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "lead" | "conversation" | "rdv" | "publication" | "erreur";
  read: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "Nouveau prospect WhatsApp", detail: "Karim El Amrani — 500 maillots personnalisés", time: "Il y a 8 min", kind: "lead", read: false },
  { id: "n2", title: "Nouvelle demande Textile", detail: "Collection sportswear, 800 pièces", time: "Il y a 42 min", kind: "lead", read: false },
  { id: "n3", title: "Un client demande à parler à un conseiller", detail: "Conversation Instagram — Maroc Events", time: "Il y a 1 h", kind: "conversation", read: false },
  { id: "n4", title: "Nouveau rendez-vous réservé", detail: "Visio jeudi 10:00 — Trans Auto SARL", time: "Il y a 3 h", kind: "rdv", read: true },
  { id: "n5", title: "Publication prévue dans 30 minutes", detail: "Reel Instagram — Coulisses sublimation", time: "Il y a 4 h", kind: "publication", read: true },
  { id: "n6", title: "Erreur de publication Instagram", detail: "Capsule sportswear — jeton expiré", time: "Hier", kind: "erreur", read: true },
];

export const analytics = {
  connectedNetworks: ["Instagram", "Facebook"],
  metrics: [
    { label: "Publications", value: "18" },
    { label: "Portée", value: "42 300" },
    { label: "Impressions", value: "61 780" },
    { label: "Engagement", value: "5,4 %" },
    { label: "Commentaires", value: "214" },
    { label: "Messages reçus", value: "168" },
    { label: "Leads générés", value: "37" },
  ],
  engagement: [
    { period: "Sem. 32", engagement: 3.1 },
    { period: "Sem. 33", engagement: 3.8 },
    { period: "Sem. 34", engagement: 4.2 },
    { period: "Sem. 35", engagement: 4.9 },
    { period: "Sem. 36", engagement: 5.1 },
    { period: "Sem. 37", engagement: 5.4 },
  ],
  topPosts: [
    { title: "1 000 sacs coton livrés", network: "Instagram", engagement: "7,8 %" },
    { title: "Montage de stand en timelapse", network: "Instagram", engagement: "6,9 %" },
    { title: "Flotte habillée en 4 jours", network: "Facebook", engagement: "4,3 %" },
  ],
  aiAnalysis:
    "Sur les 18 publications mesurées, les contenus présentant une réalisation textile obtiennent un engagement supérieur aux publications institutionnelles (6,4 % contre 3,1 %). Les formats avant/après et coulisses de production concentrent 62 % des messages reçus. Aucune donnée n'est disponible pour LinkedIn : le compte n'est pas connecté.",
};

export const faq = [
  {
    q: "Produisez-vous en petites séries ?",
    a: "Oui. Nous produisons aussi bien des séries de quelques dizaines de pièces que des productions industrielles.",
  },
  {
    q: "Pouvez-vous partir de mon fichier graphique ?",
    a: "Oui, nous acceptons les fichiers vectoriels, PDF, images haute définition et dossiers techniques.",
  },
  {
    q: "Assurez-vous la pose sur site ?",
    a: "Nos équipes assurent la pose des enseignes, habillages, stands et bâches, à Casablanca et dans les principales villes du Maroc.",
  },
  {
    q: "Quels sont vos délais et vos tarifs ?",
    a: "Les délais et les tarifs dépendent du produit, des quantités et des finitions. Cette information est validée par notre équipe commerciale à partir de votre demande.",
  },
];
