import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Tag, ThumbsUp, Users } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/spot/AppShell";
import { StatusBadge } from "@/components/spot/StatusBadge";
import { confirmReport, formatDate, useReports } from "@/lib/spot-store";

export const Route = createFileRoute("/meldingen/$id")({
  head: () => ({
    meta: [
      { title: "Melding bekijken — SPOT" },
      {
        name: "description",
        content:
          "Bekijk de details van een melding in de openbare ruimte: foto, beschrijving, locatie, datum, status en bevestigingen.",
      },
      { property: "og:title", content: "Melding bekijken — SPOT" },
      {
        property: "og:description",
        content: "Details van een melding: foto, locatie, status en het aantal bewoners dat dit ook ervaart.",
      },
    ],
  }),
  component: ReportDetail,
});

function ReportDetail() {
  const { id } = Route.useParams();
  const reports = useReports();
  const report = reports.find((r) => r.id === id);
  const [confirmed, setConfirmed] = useState(false);

  if (!report) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold">Melding niet gevonden</h1>
        <Link to="/meldingen" className="mt-4 inline-block font-semibold text-accent underline">
          Terug naar alle meldingen
        </Link>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link
        to="/meldingen"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Alle meldingen
      </Link>

      <article className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <img
          src={report.photo}
          alt={report.title}
          width={1024}
          height={640}
          className="h-56 w-full object-cover"
        />
        <div className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {report.category}
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-snug">{report.title}</h1>
          <p className="text-base leading-relaxed text-foreground/90">{report.description}</p>

          <dl className="grid gap-3 rounded-2xl bg-muted p-4 text-sm">
            <Row icon={<MapPin aria-hidden className="size-5 text-primary" />} label="Locatie">
              {report.location}
            </Row>
            <Row icon={<CalendarDays aria-hidden className="size-5 text-primary" />} label="Datum">
              {formatDate(report.date)}
            </Row>
            <Row icon={<Tag aria-hidden className="size-5 text-primary" />} label="Categorie">
              {report.category}
            </Row>
            <Row icon={<Users aria-hidden className="size-5 text-primary" />} label="Bevestigingen">
              {report.confirmations} bewoners
            </Row>
          </dl>

          <button
            type="button"
            disabled={confirmed}
            onClick={() => {
              confirmReport(report.id);
              setConfirmed(true);
            }}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
          >
            <ThumbsUp aria-hidden className="size-6" />
            {confirmed ? "Bedankt, jouw bevestiging is geteld" : "Ik ervaar dit ook"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Deze knop verhoogt alleen het aantal bevestigingen. De urgentie wordt altijd door de
            gemeente bepaald.
          </p>
        </div>
      </article>
    </AppShell>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="text-base">{children}</dd>
      </div>
    </div>
  );
}
