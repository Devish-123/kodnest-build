import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;