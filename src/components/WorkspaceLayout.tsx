import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  primary: ReactNode;
  secondary: ReactNode;
}

const WorkspaceLayout = ({ primary, secondary }: WorkspaceLayoutProps) => {
  return (
    <div className="flex flex-1 gap-sp-3 px-sp-4 pb-sp-4">
      <main className="flex-[7] min-w-0">{primary}</main>
      <aside className="flex-[3] min-w-0">{secondary}</aside>
    </div>
  );
};

export default WorkspaceLayout;
