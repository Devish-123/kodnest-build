import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Code2,
  ClipboardCheck,
  BookOpen,
  User,
  Menu,
  X,
  GraduationCap,
  Bell,
  Search,
} from "lucide-react";

const sidebarNavItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Practice", to: "/practice", icon: Code2 },
  { label: "Assessments", to: "/assessments", icon: ClipboardCheck },
  { label: "Resources", to: "/resources", icon: BookOpen },
  { label: "Profile", to: "/profile", icon: User },
];

const DashboardShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-sp-4">
          {/* Left: Logo and mobile toggle */}
          <div className="flex items-center gap-sp-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <NavLink
              to="/"
              className="flex items-center gap-sp-1 font-heading text-xl font-semibold text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline">PlacementReady</span>
            </NavLink>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-sp-4">
            <div className="relative w-full">
              <Search className="absolute left-sp-1 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search problems, topics, resources..."
                className="w-full rounded-md border border-input bg-background pl-sp-3 pr-sp-2 py-sp-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-sp-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <NavLink to="/profile">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                JD
              </div>
            </NavLink>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border bg-card pt-16 transition-transform duration-kn-base lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-sp-0.5 p-sp-2">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-sp-2 rounded-md px-sp-2 py-sp-1.5 text-sm font-medium transition-colors duration-kn-base ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Progress Card */}
          <div className="mt-auto p-sp-2">
            <div className="rounded-lg border border-border bg-secondary/50 p-sp-2">
              <h4 className="text-sm font-medium text-foreground mb-sp-1">
                Weekly Goal
              </h4>
              <div className="space-y-sp-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">12/20 problems</span>
                  <span className="text-primary font-medium">60%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[60%] bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
