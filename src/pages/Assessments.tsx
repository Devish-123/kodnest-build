import { ClipboardCheck, Target, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Assessments = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        {/* Page Header */}
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Assessments
          </h1>
          <p className="mt-sp-1 text-muted-foreground">
            Evaluate your skills with comprehensive assessments and track your growth.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sp-2">
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">85%</p>
                <p className="text-xs text-muted-foreground">Avg. Score</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/10 text-warning">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">+12%</p>
                <p className="text-xs text-muted-foreground">Improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-sp-1">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Skill Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <p className="text-muted-foreground">
              The assessments section is currently under development. Soon you'll be able to:
            </p>
            <ul className="space-y-sp-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Take timed skill assessments</li>
              <li>Get detailed performance analytics</li>
              <li>Identify weak areas to focus on</li>
              <li>Compare scores with peers</li>
              <li>Receive personalized improvement plans</li>
            </ul>
            <Button className="mt-sp-2">Browse Assessments</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessments;
