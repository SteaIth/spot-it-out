import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/spot/AppShell";
import { ReportCard } from "@/components/spot/ReportCard";
import { CATEGORIES, STATUSES, useReports } from "@/lib/spot-store";

export const Route = createFileRoute("/meldingen/")({
  head: () => ({
    meta: [
      { title: "Alle meldingen — SPOT" },
      {
        name: "description",
        content:
          "Bekijk alle meldingen uit de buurt op categorie en status: afval, straatverlichting, wegdek, groenvoorziening en overige.",
      },
      { property: "og:title", content: "Alle meldingen — SPOT" },
      {
        property: "og:description",
        content: "Overzicht van meldingen in de openbare ruimte, met categorie, locatie en status.",
      },
    ],
  }),
  component: ReportsOverview,
});

function ReportsOverview() {
  const reports = useReports();
  const [category, setCategory] = useState("alle");
  const [status, setStatus] = useState("alle");

  const visible = reports.filter(
    (r) =>
      (category === "alle" || r.category === category) && (status === "alle" || r.status === status),
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Meldingen in de buurt</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {visible.length} van {reports.length} meldingen
      </p>

      <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4">
        <label className="grid gap-1.5 text-sm font-semibold">
          Categorie
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-12 rounded-xl border border-input bg-background px-3 text-base font-normal"
          >
            <option value="alle">Alle categorieën</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="min-h-12 rounded-xl border border-input bg-background px-3 text-base font-normal"
          >
            <option value="alle">Alle statussen</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        {visible.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl bg-secondary p-4 text-secondary-foreground">
            Geen meldingen gevonden met deze filters.
          </p>
        )}
      </div>
    </AppShell>
  );
}
