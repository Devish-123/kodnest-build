import { 
  LayoutDashboard, 
  Code2, 
  ClipboardCheck, 
  BookOpen, 
  TrendingUp,
  Target,
  Clock,
  Award,
  ArrowRight,
  Flame
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const recentActivity = [
  { type: "problem", title: "Two Sum", status: "Solved", time: "2 hours ago" },
  { type: "assessment", title: "Data Structures Quiz", status: "Completed", time: "Yesterday" },
  { type: "problem", title: "Binary Search", status: "Solved", time: "Yesterday" },
];

const upcomingTasks = [
  { title: "Mock Interview - Google", date: "Tomorrow, 2:00 PM" },
  { title: "Arrays & Strings Assessment", date: "In 3 days" },
  { title: "System Design Study Group", date: "Next Monday" },
];

const DashboardHome = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sp-2">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              Welcome back, John!
            </h1>
            <p className="mt-sp-1 text-muted-foreground">
              Here's your progress and what's coming up next.
            </p>
          </div>
          <div className="flex items-center gap-sp-2">
            <div className="flex items-center gap-sp-1 rounded-full bg-primary/10 px-sp-2 py-1 text-sm text-primary">
              <Flame className="h-4 w-4" />
              <span>15 day streak</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-sp-2">
          <Card>
            <CardContent className="p-sp-2">
              <div className="flex items-center gap-sp-1 text-muted-foreground mb-sp-1">
                <Code2 className="h-4 w-4" />
                <span className="text-xs">Problems</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">128</p>
              <p className="text-xs text-success">+12 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-sp-2">
              <div className="flex items-center gap-sp-1 text-muted-foreground mb-sp-1">
                <ClipboardCheck className="h-4 w-4" />
                <span className="text-xs">Assessments</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">12</p>
              <p className="text-xs text-success">85% avg score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-sp-2">
              <div className="flex items-center gap-sp-1 text-muted-foreground mb-sp-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Study Time</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">42h</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-sp-2">
              <div className="flex items-center gap-sp-1 text-muted-foreground mb-sp-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">Ranking</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">Top 5%</p>
              <p className="text-xs text-success">+2% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-sp-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-sp-3">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-sp-1">
                  <Target className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-sp-2">
                  <NavLink to="/practice">
                    <Button variant="outline" className="w-full h-auto py-sp-2 flex-col gap-sp-1">
                      <Code2 className="h-5 w-5" />
                      <span className="text-sm">Practice Problems</span>
                    </Button>
                  </NavLink>
                  <NavLink to="/assessments">
                    <Button variant="outline" className="w-full h-auto py-sp-2 flex-col gap-sp-1">
                      <ClipboardCheck className="h-5 w-5" />
                      <span className="text-sm">Take Assessment</span>
                    </Button>
                  </NavLink>
                  <NavLink to="/resources">
                    <Button variant="outline" className="w-full h-auto py-sp-2 flex-col gap-sp-1">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-sm">Browse Resources</span>
                    </Button>
                  </NavLink>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="gap-sp-0.5">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-sp-2">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-sp-1 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-sp-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${
                          activity.type === "problem" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                        }`}>
                          {activity.type === "problem" ? <Code2 className="h-4 w-4" /> : <ClipboardCheck className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${
                        activity.status === "Solved" || activity.status === "Completed" 
                          ? "text-success" 
                          : "text-muted-foreground"
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-sp-3">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-sp-1">
                  <Clock className="h-5 w-5 text-primary" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-sp-2">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="rounded-md border border-border p-sp-2">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-sp-0.5">{task.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-sp-1">
                  <Award className="h-5 w-5 text-primary" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-sp-2">
                  <div className="flex items-center gap-sp-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-warning">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">15 Day Streak</p>
                      <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sp-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">100 Problems</p>
                      <p className="text-xs text-muted-foreground">Milestone reached</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-sp-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Problems</span>
                    <span className="font-medium text-foreground">12/20</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[60%] bg-primary rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Study Hours</span>
                    <span className="font-medium text-foreground">8/10</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[80%] bg-success rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
