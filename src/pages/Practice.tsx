import { Code2, BookOpen, Trophy, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Practice = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        {/* Page Header */}
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Practice
          </h1>
          <p className="mt-sp-1 text-muted-foreground">
            Sharpen your skills with curated coding problems and exercises.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sp-2">
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">128</p>
                <p className="text-xs text-muted-foreground">Problems Solved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">15</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/10 text-warning">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">42h</p>
                <p className="text-xs text-muted-foreground">Time Spent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Topics Covered</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-sp-1">
              <Code2 className="h-5 w-5 text-primary" />
              Practice Problems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <p className="text-muted-foreground">
              The practice problems section is currently under development. Soon you'll be able to:
            </p>
            <ul className="space-y-sp-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Browse 500+ curated coding problems</li>
              <li>Filter by difficulty, topic, and company</li>
              <li>Track your progress and time spent</li>
              <li>View detailed solutions and explanations</li>
              <li>Practice with an integrated code editor</li>
            </ul>
            <Button className="mt-sp-2">Explore Preview</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practice;
