import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { Rocket, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Ship = () => {
  const { allChecked, checkedCount, totalCount } = useTestChecklist();

  if (!allChecked) {
    return (
      <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
        <div className="mx-auto w-full max-w-xl">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Lock className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="mt-sp-3 text-xl">Access Locked</CardTitle>
              <CardDescription>
                Complete all tests on the checklist before you can ship
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-white p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Progress
                </p>
                <p className="text-2xl font-semibold">
                  {checkedCount} / {totalCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  {totalCount - checkedCount} test{totalCount - checkedCount !== 1 ? "s" : ""} remaining
                </p>
              </div>
              <Button asChild className="w-full gap-2">
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
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-xl">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Rocket className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="mt-sp-3 text-xl">Ready to Ship</CardTitle>
            <CardDescription>
              All tests have passed. You are cleared for deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-white p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium">All Tests Passed</p>
                  <p className="text-sm text-muted-foreground">
                    {totalCount} / {totalCount} tests completed
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 gap-2">
                <Link to="/jt/07-test">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Tests
                </Link>
              </Button>
              <Button className="flex-1 gap-2">
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
