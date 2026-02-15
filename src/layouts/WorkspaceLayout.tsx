import { cn } from "@/lib/utils";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  primaryPanel?: React.ReactNode;
  secondaryPanel?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const WorkspaceLayout = ({ 
  children,
  primaryPanel,
  secondaryPanel,
  footer,
  className,
  contentClassName
}: WorkspaceLayoutProps) => {
  const hasTwoPanels = primaryPanel && secondaryPanel;

  return (
    <div className={cn("flex flex-1 flex-col px-sp-4 py-sp-4", className)}>
      <div className={cn("mx-auto w-full max-w-6xl", contentClassName)}>
        {hasTwoPanels ? (
          /* Two-panel layout: Primary (70%) + Secondary (30%) */
          <div className="flex flex-col lg:flex-row gap-sp-4">
            <div className="flex-1 lg:w-[70%] min-w-0">
              {primaryPanel}
            </div>
            <div className="lg:w-[30%] min-w-0">
              {secondaryPanel}
            </div>
          </div>
        ) : (
          /* Single content area */
          children
        )}
        
        {footer && (
          <div className="mt-sp-4 pt-sp-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceLayout;
