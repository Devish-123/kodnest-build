import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  primary: ReactNode;
  secondary: ReactNode;
}

const WorkspaceLayout = ({ primary, secondary }: WorkspaceLayoutProps) => {
  return (
    <div className="flex flex-1 gap-sp-4 px-sp-4 pb-sp-4">
      <main className="flex-[70%] min-w-0">{primary}</main>
      <aside className="flex-[30%] min-w-0">{secondary}</aside>
    </div>
  );
};

export default WorkspaceLayout;