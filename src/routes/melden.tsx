import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Send } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/spot/AppShell";
import { CATEGORIES, addReport, type Category } from "@/lib/spot-store";

export const Route = createFileRoute("/melden")({
  head: () => ({
    meta: [
      { title: "Melding plaatsen — SPOT" },
      {
        name: "description",
        content:
          "Plaats in een minuut een melding: kies een categorie, voeg een foto en locatie toe en beschrijf wat je ziet.",
      },
      { property: "og:title", content: "Melding plaatsen — SPOT" },
      {
        property: "og:description",
        content: "Meld een probleem in de openbare ruimte met foto, locatie en korte beschrijving.",
      },
    ],
  }),
  component: NewReport,
});

function NewReport() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Afval");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [error, setError] = useState("");

  function onPhoto(file: File | undefined) {
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) {
      setError("Vul een titel, beschrijving en locatie in.");
      return;
    }
    const report = addReport({ title, description, category, location, photo });
    navigate({ to: "/meldingen/$id", params: { id: report.id } });
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Melding plaatsen</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Vul alleen in wat nodig is om de plek te vinden. Deel geen persoonsgegevens.
      </p>

      <form onSubmit={onSubmit} className="mt-5 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          Titel
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bijvoorbeeld: kapotte lantaarn bij de brug"
            className="min-h-14 rounded-2xl border border-input bg-card px-4 text-base font-normal"
          />
        </label>

        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-semibold">Categorie</legend>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`min-h-14 rounded-2xl border-2 px-3 text-base font-semibold ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm font-semibold">
          Locatie
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Straat, huisnummer of herkenningspunt"
            className="min-h-14 rounded-2xl border border-input bg-card px-4 text-base font-normal"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Korte beschrijving
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Wat zie je en waarom is het een probleem?"
            className="rounded-2xl border border-input bg-card p-4 text-base font-normal"
          />
        </label>

        <div className="grid gap-2 text-sm font-semibold">
          Foto
          <label className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card text-base font-semibold text-accent">
            <Camera aria-hidden className="size-6" />
            {photo ? "Andere foto kiezen" : "Foto toevoegen"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
          </label>
          {photo && (
            <img
              src={photo}
              alt="Voorbeeld van de gekozen foto"
              className="h-40 w-full rounded-2xl object-cover"
            />
          )}
          <p className="text-xs font-normal text-muted-foreground">
            Zonder eigen foto gebruiken we een voorbeeldfoto van de categorie.
          </p>
        </div>

        {error && (
          <p role="alert" className="rounded-2xl bg-destructive px-4 py-3 text-destructive-foreground">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground"
        >
          <Send aria-hidden className="size-6" />
          Melding versturen
        </button>
      </form>
    </AppShell>
  );
}
