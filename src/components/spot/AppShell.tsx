import { Link } from "@tanstack/react-router";
import { Home, LayoutList, PlusCircle, ClipboardCheck } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Start", icon: Home },
  { to: "/meldingen", label: "Meldingen", icon: LayoutList },
  { to: "/melden", label: "Melden", icon: PlusCircle },
  { to: "/dashboard", label: "Gemeente", icon: ClipboardCheck },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 border-b border-border bg-header text-header-foreground">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-header-accent text-lg font-bold text-header-accent-foreground">
              S
            </span>
            <span className="text-xl font-bold tracking-tight">SPOT</span>
          </Link>
          <span className="text-sm opacity-90">Samen de buurt op orde</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>

      <nav
        aria-label="Hoofdmenu"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card"
      >
        <ul className="mx-auto flex max-w-2xl">
          {nav.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "text-primary font-semibold" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs"
              >
                <Icon aria-hidden className="size-6" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
