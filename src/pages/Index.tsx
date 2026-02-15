import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
      <div className="max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-semibold leading-tight md:text-5xl text-foreground">
          Stop Missing The Right Jobs.
        </h1>
        <p className="mx-auto mt-sp-3 text-lg text-muted-foreground">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Button
          size="lg"
          className="mt-sp-4"
          onClick={() => navigate("/settings")}
        >
          Start Tracking
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;