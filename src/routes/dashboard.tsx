import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/spot/AppShell";
import { StatusBadge } from "@/components/spot/StatusBadge";
import {
  CATEGORIES,
  STATUSES,
  formatDate,
  setStatus,
  useReports,
  type Status,
} from "@/lib/spot-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Gemeentedashboard — SPOT" },
      {
        name: "description",
        content:
          "Dashboard voor gemeentelijke medewerkers: meldingen bekijken, filteren op categorie en status, en de status bijwerken.",
      },
      { property: "og:title", content: "Gemeentedashboard — SPOT" },
      {
        property: "og:description",
        content: "Filter meldingen en zet de status op ontvangen, in behandeling, opgelost of afgewezen.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const reports = useReports();
  const [category, setCategory] = useState("alle");
  const [status, setStatusFilter] = useState("alle");

  const visible = reports.filter(
    (r) =>
      (category === "alle" || r.category === category) && (status === "alle" || r.status === status),
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Dashboard gemeente</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Demo-omgeving met voorbeeldgegevens. Bevestigingen door bewoners bepalen niet automatisch de
        urgentie.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-2xl font-bold text-primary">
              {reports.filter((r) => r.status === s).length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-border bg-card p-4">
        <label className="grid gap-1.5 text-sm font-semibold">
          Filter op categorie
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
          Filter op status
          <select
            value={status}
            onChange={(e) => setStatusFilter(e.target.value)}
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
          <div key={report.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={report.status} />
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {report.category}
              </span>
              <span className="text-xs text-muted-foreground">{report.confirmations}× bevestigd</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug">{report.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {report.location} · {formatDate(report.date)}
            </p>

            <label className="mt-4 grid gap-1.5 text-sm font-semibold">
              Status aanpassen
              <select
                value={report.status}
                onChange={(e) => setStatus(report.id, e.target.value as Status)}
                className="min-h-12 rounded-xl border border-input bg-background px-3 text-base font-normal"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <Link
              to="/meldingen/$id"
              params={{ id: report.id }}
              className="mt-3 inline-block text-sm font-semibold text-accent underline"
            >
              Melding openen
            </Link>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl bg-secondary p-4 text-secondary-foreground">
            Geen meldingen met deze filters.
          </p>
        )}
      </div>
    </AppShell>
  );
}
