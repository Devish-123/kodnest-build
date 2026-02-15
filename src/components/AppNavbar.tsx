import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
];

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-sp-4 py-sp-2">
        <NavLink
          to="/"
          className="font-heading text-lg font-semibold tracking-tight text-foreground"
        >
          KodNest
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-sp-3 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="text-sm text-muted-foreground transition-colors duration-base ease-base hover:text-foreground"
                activeClassName="text-primary border-b-2 border-primary pb-1"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

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
        <ul className="border-t px-sp-4 py-sp-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="block py-sp-1 text-sm text-muted-foreground transition-colors duration-base ease-base hover:text-foreground"
                activeClassName="text-primary font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default AppNavbar;
