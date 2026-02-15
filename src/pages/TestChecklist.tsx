import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContextHeader from "@/components/ContextHeader";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { RotateCcw, CheckCircle2 } from "lucide-react";
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
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-2xl space-y-sp-4">
        <ContextHeader
          title="Test Checklist"
          description="Complete all tests before shipping"
        />

        <Card>
          <CardHeader className="pb-sp-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-foreground">Progress</CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {checkedCount} / {totalCount}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-sp-1">
                {allChecked ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium text-success">
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
                className="gap-sp-1"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-foreground">Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-sp-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-sp-2 rounded-md border border-border p-sp-2 transition-colors duration-kn-base ease-in-out hover:bg-muted/50"
                >
                  <Checkbox
                    id={`test-${item.id}`}
                    checked={isChecked(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`test-${item.id}`}
                    className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
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