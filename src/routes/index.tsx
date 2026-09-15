import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle, LayoutList, Users, CheckCircle2 } from "lucide-react";

import { AppShell } from "@/components/spot/AppShell";
import { ReportCard } from "@/components/spot/ReportCard";
import { useReports } from "@/lib/spot-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPOT — meld problemen in de openbare ruimte" },
      {
        name: "description",
        content:
          "Met SPOT melden bewoners afval, kapotte straatverlichting, slecht wegdek en meer, en volgen ze de status van elke melding.",
      },
      { property: "og:title", content: "SPOT — meld problemen in de openbare ruimte" },
      {
        property: "og:description",
        content: "Meld een probleem in de buurt en volg samen met andere bewoners de status.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const reports = useReports();
  const recent = reports.slice(0, 3);
  const solved = reports.filter((r) => r.status === "Opgelost").length;
  const confirmations = reports.reduce((sum, r) => sum + r.confirmations, 0);

  return (
    <AppShell>
      <section className="rounded-3xl bg-header p-6 text-header-foreground shadow-soft">
        <h1 className="text-3xl font-bold leading-tight">Zie je iets in de buurt?</h1>
        <p className="mt-3 text-base opacity-95">
          Meld het in een minuut. Andere bewoners kunnen aangeven dat zij dit ook ervaren, zodat de
          gemeente ziet wat er leeft.
        </p>
        <div className="mt-6 grid gap-3">
          <Link
            to="/melden"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-header-accent text-lg font-semibold text-header-accent-foreground"
          >
            <PlusCircle aria-hidden className="size-6" />
            Melding plaatsen
          </Link>
          <Link
            to="/meldingen"
            className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-header-foreground/50 text-lg font-semibold"
          >
            <LayoutList aria-hidden className="size-6" />
            Alle meldingen bekijken
          </Link>
        </div>
      </section>

      <section aria-label="Cijfers uit de buurt" className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Meldingen" value={reports.length} />
        <Stat label="Opgelost" value={solved} icon={<CheckCircle2 aria-hidden className="size-4" />} />
        <Stat label="Bevestigd" value={confirmations} icon={<Users aria-hidden className="size-4" />} />
      </section>

      <section className="mt-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-bold">Recente meldingen</h2>
          <Link to="/meldingen" className="text-sm font-semibold text-accent underline">
            Bekijk alles
          </Link>
        </div>
        <div className="mt-4 grid gap-4">
          {recent.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
    </div>
  );
}
