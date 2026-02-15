import { User, Mail, Building2, GraduationCap, Award, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              Profile
            </h1>
            <p className="mt-sp-1 text-muted-foreground">
              Manage your account and view your achievements.
            </p>
          </div>
          <Button variant="outline" className="gap-sp-1">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-sp-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-sp-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-semibold">
                JD
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  John Doe
                </h2>
                <div className="mt-sp-1 flex flex-wrap items-center gap-sp-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-sp-0.5">
                    <Mail className="h-4 w-4" />
                    john.doe@example.com
                  </span>
                  <span className="hidden sm:inline text-border">|</span>
                  <span className="flex items-center gap-sp-0.5">
                    <Building2 className="h-4 w-4" />
                    Computer Science
                  </span>
                  <span className="hidden sm:inline text-border">|</span>
                  <span className="flex items-center gap-sp-0.5">
                    <GraduationCap className="h-4 w-4" />
                    Final Year
                  </span>
                </div>
                <div className="mt-sp-2 flex flex-wrap gap-sp-1">
                  <Badge variant="secondary">Data Structures</Badge>
                  <Badge variant="secondary">Algorithms</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">System Design</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sp-2">
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">Top 5%</p>
                <p className="text-xs text-muted-foreground">Ranking</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/10 text-warning">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">8.5</p>
                <p className="text-xs text-muted-foreground">CGPA</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Sections Coming Soon */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-sp-3">
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your recent practice sessions, assessments, and achievements will appear here.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Target Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your preparation progress for specific companies and roles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
