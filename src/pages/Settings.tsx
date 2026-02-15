import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-sp-4 py-sp-4">
      <h1 className="text-3xl font-semibold">Preferences</h1>
      <p className="mt-sp-1 text-muted-foreground">
        Define what you're looking for. Matching logic will be added in the next step.
      </p>

      <Card className="mt-sp-3">
        <CardHeader>
          <CardTitle className="text-lg">Job Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-sp-3">
          <div className="space-y-sp-1">
            <Label htmlFor="keywords">Role Keywords</Label>
            <Input
              id="keywords"
              placeholder="e.g. Frontend Engineer, Product Designer"
            />
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="locations">Preferred Locations</Label>
            <Input
              id="locations"
              placeholder="e.g. Bangalore, Mumbai, Delhi"
            />
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="mode">Mode</Label>
            <Select>
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select work mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="experience">Experience Level</Label>
            <Select>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fresher">Fresher</SelectItem>
                <SelectItem value="junior">Junior (1–3 yrs)</SelectItem>
                <SelectItem value="mid">Mid (3–6 yrs)</SelectItem>
                <SelectItem value="senior">Senior (6+ yrs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-sp-2 w-full" disabled>
            Save Preferences
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Save functionality will be enabled in a later step.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
