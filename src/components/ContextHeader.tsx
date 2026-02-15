import { cn } from "@/lib/utils";

interface ContextHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

const ContextHeader = ({ 
  title, 
  description, 
  actions,
  className 
}: ContextHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-sp-1", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sp-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          {title}
        </h1>
        {actions && (
          <div className="flex items-center gap-sp-2">
            {actions}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
};

export default ContextHeader;
