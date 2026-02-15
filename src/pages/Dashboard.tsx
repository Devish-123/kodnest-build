import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Briefcase className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-sp-3 text-2xl font-semibold">No jobs yet</h2>
        <p className="mt-sp-1 max-w-md text-muted-foreground">
          In the next step, you will load a realistic dataset.
        </p>
        <Button
          variant="secondary"
          className="mt-sp-3"
          onClick={() => navigate("/settings")}
        >
          Configure Preferences
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
