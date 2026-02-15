import { Outlet } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;