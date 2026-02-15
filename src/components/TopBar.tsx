import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
];

const TopBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-sp-4 py-sp-2">
        {/* Project Name - Left */}
        <NavLink
          to="/"
          className="font-heading text-lg font-semibold tracking-tight text-foreground"
        >
          KodNest Premium
        </NavLink>

        {/* Progress - Center */}
        <div className="hidden md:flex items-center gap-sp-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Build System
          </span>
          <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/4 bg-primary rounded-full" />
          </div>
        </div>

        {/* Status Badge - Right */}
        <div className="hidden md:flex items-center gap-sp-3">
          <span className="inline-flex items-center rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
            Active
          </span>
          
          {/* Desktop nav */}
          <nav className="flex items-center gap-sp-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-sp-1 py-1 text-sm text-muted-foreground transition-colors duration-kn-base ease-in-out hover:text-foreground"
                activeClassName="text-primary font-medium"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border px-sp-4 py-sp-2 md:hidden">
          <div className="flex items-center justify-between pb-sp-2 mb-sp-2 border-b border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Build System
            </span>
            <span className="inline-flex items-center rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              Active
            </span>
          </div>
          <ul className="space-y-sp-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="block py-sp-1 text-sm text-muted-foreground transition-colors duration-kn-base ease-in-out hover:text-foreground"
                  activeClassName="text-primary font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default TopBar;
