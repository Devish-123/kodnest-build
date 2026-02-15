import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
}

const statusStyles: Record<TopBarProps["status"], string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning-foreground border-warning/30",
  "Shipped": "bg-success/15 text-success border-success/30",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-sp-4 py-sp-2">
      <span className="font-heading text-base font-semibold tracking-tight">
        {projectName}
      </span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge variant="outline" className={statusStyles[status]}>
        {status}
      </Badge>
    </header>
  );
};

export default TopBar;
