import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ContextHeader from "@/components/ContextHeader";
import { jobs } from "@/data/jobs";
import { usePreferences } from "@/hooks/use-preferences";
import type { UserPreferences } from "@/types/preferences";
import type { JobMode, JobExperience } from "@/types/job";

const LOCATIONS = Array.from(new Set(jobs.map((j) => j.location))).sort();
const MODES: JobMode[] = ["Remote", "Hybrid", "Onsite"];
const EXPERIENCES: JobExperience[] = ["Fresher", "0-1", "1-3", "3-5"];

const Settings = () => {
  const { preferences, save } = usePreferences();
  const [roleKeywords, setRoleKeywords] = useState(preferences.roleKeywords);
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    preferences.preferredLocations,
  );
  const [preferredMode, setPreferredMode] = useState<JobMode[]>(
    preferences.preferredMode,
  );
  const [experienceLevel, setExperienceLevel] = useState<
    JobExperience | ""
  >(preferences.experienceLevel);
  const [skills, setSkills] = useState(preferences.skills);
  const [minMatchScore, setMinMatchScore] = useState(preferences.minMatchScore);
  const [locationsOpen, setLocationsOpen] = useState(false);

  useEffect(() => {
    setRoleKeywords(preferences.roleKeywords);
    setPreferredLocations(preferences.preferredLocations);
    setPreferredMode(preferences.preferredMode);
    setExperienceLevel(preferences.experienceLevel);
    setSkills(preferences.skills);
    setMinMatchScore(preferences.minMatchScore);
  }, [preferences]);

  const toggleLocation = (loc: string) => {
    setPreferredLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );
  };

  const toggleMode = (mode: JobMode) => {
    setPreferredMode((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode],
    );
  };

  const handleSave = () => {
    const next: UserPreferences = {
      roleKeywords: roleKeywords.trim(),
      preferredLocations: [...preferredLocations],
      preferredMode: [...preferredMode],
      experienceLevel,
      skills: skills.trim(),
      minMatchScore,
    };
    save(next);
  };

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-2xl space-y-sp-4">
        <ContextHeader
          title="Preferences"
          description="Define what you're looking for. Your choices power intelligent matching on the Dashboard."
        />

        <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Job Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-sp-3">
          <div className="space-y-sp-1">
            <Label htmlFor="roleKeywords">Role Keywords</Label>
            <Input
              id="roleKeywords"
              placeholder="e.g. SDE Intern, React Developer, Backend"
              value={roleKeywords}
              onChange={(e) => setRoleKeywords(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated. Used to match job title and description.
            </p>
          </div>

          <div className="space-y-sp-1">
            <Label>Preferred Locations</Label>
            <Popover open={locationsOpen} onOpenChange={setLocationsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  <span className="truncate">
                    {preferredLocations.length === 0
                      ? "Select locations..."
                      : `${preferredLocations.length} selected`}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] px-sp-1 py-sp-1" align="start">
                <div className="max-h-60 overflow-y-auto space-y-sp-0.5">
                  {LOCATIONS.map((loc) => (
                    <label
                      key={loc}
                      className="flex items-center gap-sp-1 rounded-md px-sp-1 py-sp-0.5 text-sm cursor-pointer hover:bg-accent"
                    >
                      <Checkbox
                        checked={preferredLocations.includes(loc)}
                        onCheckedChange={() => toggleLocation(loc)}
                      />
                      {loc}
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-sp-1">
            <Label>Preferred Mode</Label>
            <div className="flex flex-wrap gap-sp-2">
              {MODES.map((mode) => (
                <label
                  key={mode}
                  className="flex items-center gap-sp-1 cursor-pointer"
                >
                  <Checkbox
                    checked={preferredMode.includes(mode)}
                    onCheckedChange={() => toggleMode(mode)}
                  />
                  <span className="text-sm">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              value={experienceLevel || "all"}
              onValueChange={(v) =>
                setExperienceLevel(v === "all" ? "" : (v as JobExperience))
              }
            >
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                {EXPERIENCES.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              placeholder="e.g. React, Java, Python, SQL"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated. Match against job skills.
            </p>
          </div>

          <div className="space-y-sp-1">
            <Label htmlFor="minMatchScore">
              Minimum match score: {minMatchScore}
            </Label>
            <Slider
              id="minMatchScore"
              min={0}
              max={100}
              step={5}
              value={[minMatchScore]}
              onValueChange={([v]) => setMinMatchScore(v ?? 40)}
            />
            <p className="text-xs text-muted-foreground">
              Show only jobs above this score when "Show only matches" is on (0–100, default 40).
            </p>
          </div>

          <Button className="mt-sp-1 w-full" onClick={handleSave}>
            Save Preferences
          </Button>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;