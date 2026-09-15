import type { Status } from "@/lib/spot-store";

const styles: Record<Status, string> = {
  Ontvangen: "bg-status-new text-status-new-foreground",
  "In behandeling": "bg-status-progress text-status-progress-foreground",
  Opgelost: "bg-status-done text-status-done-foreground",
  Afgewezen: "bg-status-rejected text-status-rejected-foreground",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
