import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { RotateCcw, CheckCircle2, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const TestChecklist = () => {
  const {
    items,
    checkedCount,
    totalCount,
    progress,
    allChecked,
    toggleItem,
    isChecked,
    reset,
  } = useTestChecklist();

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-sp-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Test Checklist</h1>
            <p className="text-sm text-muted-foreground">
              Complete all tests before shipping
            </p>
          </div>
        </div>

        <Card className="mb-sp-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Progress</CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {checkedCount} / {totalCount}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {allChecked ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      All tests passed
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {totalCount - checkedCount} tests remaining
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    id={`test-${item.id}`}
                    checked={isChecked(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`test-${item.id}`}
                    className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-sp-4 flex justify-end">
          <Button asChild disabled={!allChecked} variant={allChecked ? "default" : "secondary"}>
            <Link to="/jt/08-ship">
              {allChecked ? "Proceed to Ship" : "Complete all tests to proceed"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestChecklist;
