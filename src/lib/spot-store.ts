import { useSyncExternalStore } from "react";

import afval from "@/assets/afval.jpg";
import straatverlichting from "@/assets/straatverlichting.jpg";
import wegdek from "@/assets/wegdek.jpg";
import groen from "@/assets/groen.jpg";
import overige from "@/assets/overige.jpg";

export const CATEGORIES = [
  "Afval",
  "Straatverlichting",
  "Wegdek",
  "Groenvoorziening",
  "Overige",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["Ontvangen", "In behandeling", "Opgelost", "Afgewezen"] as const;
export type Status = (typeof STATUSES)[number];

export type Report = {
  id: string;
  title: string;
  photo: string;
  description: string;
  category: Category;
  location: string;
  date: string; // ISO date
  status: Status;
  confirmations: number;
};

export const CATEGORY_PHOTOS: Record<Category, string> = {
  Afval: afval,
  Straatverlichting: straatverlichting,
  Wegdek: wegdek,
  Groenvoorziening: groen,
  Overige: overige,
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const seed: Report[] = [
  {
    id: "m-1001",
    title: "Overvolle afvalbak bij het buurtplein",
    photo: CATEGORY_PHOTOS.Afval,
    description:
      "De afvalbak op de hoek zit al dagen vol. Er waait afval over het plein en meeuwen halen het eruit.",
    category: "Afval",
    location: "Buurtplein 4, Noordwijk-Oost",
    date: "2026-09-12",
    status: "Ontvangen",
    confirmations: 14,
  },
  {
    id: "m-1002",
    title: "Straatlantaarn omgevallen na storm",
    photo: CATEGORY_PHOTOS.Straatverlichting,
    description:
      "Een lantaarnpaal ligt op het trottoir en de kabels zijn zichtbaar. De straat is 's avonds volledig donker.",
    category: "Straatverlichting",
    location: "Lindenlaan 78",
    date: "2026-09-11",
    status: "In behandeling",
    confirmations: 31,
  },
  {
    id: "m-1003",
    title: "Diep gat in het wegdek",
    photo: CATEGORY_PHOTOS.Wegdek,
    description:
      "Vlak voor het zebrapad zit een groot gat in het asfalt. Fietsers moeten er onverwacht om heen sturen.",
    category: "Wegdek",
    location: "Kerkstraat bij nummer 12",
    date: "2026-09-10",
    status: "In behandeling",
    confirmations: 22,
  },
  {
    id: "m-1004",
    title: "Hoge heg blokkeert het zicht bij speeltuin",
    photo: CATEGORY_PHOTOS.Groenvoorziening,
    description:
      "De heg naast de speeltuin is erg hoog geworden. Vanaf het pad zie je spelende kinderen niet meer.",
    category: "Groenvoorziening",
    location: "Parkzicht, speeltuin De Wilg",
    date: "2026-09-09",
    status: "Ontvangen",
    confirmations: 9,
  },
  {
    id: "m-1005",
    title: "Kapotte bank op het marktplein",
    photo: CATEGORY_PHOTOS.Overige,
    description:
      "De houten zitting van de bank is gebroken en staat scheef. Er steken schroeven uit de planken.",
    category: "Overige",
    location: "Marktplein, bij de fietsenstalling",
    date: "2026-09-08",
    status: "Opgelost",
    confirmations: 6,
  },
  {
    id: "m-1006",
    title: "Zwerfafval langs het fietspad",
    photo: CATEGORY_PHOTOS.Afval,
    description:
      "Langs het fietspad ligt over een lange strook plastic en glas. Glas ligt deels op het fietspad zelf.",
    category: "Afval",
    location: "Fietspad langs de Vaartsingel",
    date: "2026-09-07",
    status: "Ontvangen",
    confirmations: 11,
  },
  {
    id: "m-1007",
    title: "Lantaarn knippert de hele nacht",
    photo: CATEGORY_PHOTOS.Straatverlichting,
    description:
      "De lamp gaat continu aan en uit. Dat geeft onrustig licht in de slaapkamers aan de straatkant.",
    category: "Straatverlichting",
    location: "Beukenhof 21",
    date: "2026-09-06",
    status: "In behandeling",
    confirmations: 17,
  },
  {
    id: "m-1008",
    title: "Losliggende stoeptegels bij bushalte",
    photo: CATEGORY_PHOTOS.Wegdek,
    description:
      "Bij de bushalte liggen meerdere tegels los en scheef. Met een rollator is dit lastig te passeren.",
    category: "Wegdek",
    location: "Bushalte Stationsweg",
    date: "2026-09-05",
    status: "Opgelost",
    confirmations: 25,
  },
  {
    id: "m-1009",
    title: "Onkruid overwoekert het wandelpad",
    photo: CATEGORY_PHOTOS.Groenvoorziening,
    description:
      "Het pad door het buurtparkje is nog maar half zo breed door hoog onkruid en overhangende takken.",
    category: "Groenvoorziening",
    location: "Buurtpark De Weide",
    date: "2026-09-04",
    status: "Ontvangen",
    confirmations: 8,
  },
  {
    id: "m-1010",
    title: "Graffiti op het viaduct",
    photo: CATEGORY_PHOTOS.Overige,
    description:
      "Onder het viaduct is een grote muur bekladd. Bewoners vinden de doorgang er onaantrekkelijk uitzien.",
    category: "Overige",
    location: "Viaduct Zuiderbrug",
    date: "2026-09-03",
    status: "Afgewezen",
    confirmations: 4,
  },
  {
    id: "m-1011",
    title: "Volle glasbak, dozen ernaast",
    photo: CATEGORY_PHOTOS.Afval,
    description:
      "De glasbak is vol en er staan dozen met flessen naast. Op de stoep ligt gebroken glas.",
    category: "Afval",
    location: "Hoek Molenstraat / Kanaalkade",
    date: "2026-09-02",
    status: "In behandeling",
    confirmations: 19,
  },
  {
    id: "m-1012",
    title: "Donkere doorgang zonder werkende lampen",
    photo: CATEGORY_PHOTOS.Straatverlichting,
    description:
      "In het steegje tussen twee woonblokken werkt geen enkele lamp meer. Bewoners lopen er liever om heen.",
    category: "Straatverlichting",
    location: "Steeg tussen Vlierhof en Elzenhof",
    date: "2026-09-01",
    status: "Ontvangen",
    confirmations: 13,
  },
];

let reports: Report[] = seed;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return reports;
}

export function useReports() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function getReport(id: string) {
  return reports.find((r) => r.id === id);
}

export function confirmReport(id: string) {
  reports = reports.map((r) => (r.id === id ? { ...r, confirmations: r.confirmations + 1 } : r));
  emit();
}

export function setStatus(id: string, status: Status) {
  reports = reports.map((r) => (r.id === id ? { ...r, status } : r));
  emit();
}

export function addReport(input: {
  title: string;
  description: string;
  category: Category;
  location: string;
  photo?: string;
}) {
  const id = `m-${1013 + reports.length}`;
  const report: Report = {
    id,
    title: input.title,
    description: input.description,
    category: input.category,
    location: input.location,
    photo: input.photo || CATEGORY_PHOTOS[input.category],
    date: new Date().toISOString().slice(0, 10),
    status: "Ontvangen",
    confirmations: 1,
  };
  reports = [report, ...reports];
  emit();
  return report;
}
