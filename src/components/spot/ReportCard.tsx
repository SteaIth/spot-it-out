import { Link } from "@tanstack/react-router";
import { MapPin, CalendarDays, Users } from "lucide-react";

import { formatDate, type Report } from "@/lib/spot-store";
import { StatusBadge } from "./StatusBadge";

export function ReportCard({ report }: { report: Report }) {
  return (
    <Link
      to="/meldingen/$id"
      params={{ id: report.id }}
      className="block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform active:scale-[0.99]"
    >
      <img
        src={report.photo}
        alt={report.title}
        loading="lazy"
        width={1024}
        height={640}
        className="h-40 w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={report.status} />
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {report.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-card-foreground">{report.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{report.description}</p>
        <dl className="grid gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin aria-hidden className="size-4 shrink-0 text-primary" />
            <span>{report.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4 shrink-0 text-primary" />
            <span>{formatDate(report.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users aria-hidden className="size-4 shrink-0 text-primary" />
            <span>{report.confirmations} bewoners ervaren dit ook</span>
          </div>
        </dl>
      </div>
    </Link>
  );
}
