import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-sp-4 bg-background">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl font-bold text-foreground mb-sp-2">404</h1>
        <p className="text-xl text-muted-foreground mb-sp-4">Page not found</p>
        <p className="text-sm text-muted-foreground mb-sp-4 max-w-prose">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
