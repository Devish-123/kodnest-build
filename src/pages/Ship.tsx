import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContextHeader from "@/components/ContextHeader";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { Rocket, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Ship = () => {
  const { allChecked, checkedCount, totalCount } = useTestChecklist();

  if (!allChecked) {
    return (
      <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
        <div className="mx-auto w-full max-w-xl space-y-sp-4">
          <ContextHeader
            title="Ship"
            description="Finalize and deploy your project"
          />
          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                <Lock className="h-8 w-8 text-warning" />
              </div>
              <CardTitle className="mt-sp-3 text-xl text-foreground">Access Locked</CardTitle>
              <CardDescription>
                Complete all tests on the checklist before you can ship
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-sp-3">
              <div className="rounded-md border border-border bg-background p-sp-3 text-center">
                <p className="text-sm text-muted-foreground">
                  Progress
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {checkedCount} / {totalCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {totalCount - checkedCount} test{totalCount - checkedCount !== 1 ? "s" : ""} remaining
                </p>
              </div>
              <Button asChild className="w-full gap-sp-1">
                <Link to="/jt/07-test">
                  <ArrowLeft className="h-4 w-4" />
                  Go to Test Checklist
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-xl space-y-sp-4">
        <ContextHeader
          title="Ship"
          description="Finalize and deploy your project"
        />
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <Rocket className="h-8 w-8 text-success" />
            </div>
            <CardTitle className="mt-sp-3 text-xl text-foreground">Ready to Ship</CardTitle>
            <CardDescription>
              All tests have passed. You are cleared for deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <div className="rounded-md border border-border bg-background p-sp-3">
              <div className="flex items-center gap-sp-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                <div>
                  <p className="font-medium text-foreground">All Tests Passed</p>
                  <p className="text-sm text-muted-foreground">
                    {totalCount} / {totalCount} tests completed
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-sp-2">
              <Button asChild variant="outline" className="flex-1 gap-sp-1">
                <Link to="/jt/07-test">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Tests
                </Link>
              </Button>
              <Button className="flex-1 gap-sp-1">
                <Rocket className="h-4 w-4" />
                Ship It
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ship;