import { type JobStatus } from "@/hooks/use-job-status";

export function getStatusBadgeClass(status: JobStatus): string {
  switch (status) {
    case "Applied":
      return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
    case "Rejected":
      return "bg-red-500 text-white border-red-500 hover:bg-red-600";
    case "Selected":
      return "bg-green-500 text-white border-green-500 hover:bg-green-600";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function getStatusToggleClass(status: JobStatus, isActive: boolean): string {
  if (!isActive) return "";
  
  switch (status) {
    case "Applied":
      return "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500";
    case "Rejected":
      return "bg-red-500 text-white border-red-500 hover:bg-red-600 data-[state=on]:bg-red-500 data-[state=on]:text-white data-[state=on]:border-red-500";
    case "Selected":
      return "bg-green-500 text-white border-green-500 hover:bg-green-600 data-[state=on]:bg-green-500 data-[state=on]:text-white data-[state=on]:border-green-500";
    default:
      return "bg-muted text-muted-foreground data-[state=on]:bg-muted data-[state=on]:text-muted-foreground";
  }
}

export function formatStatusDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
