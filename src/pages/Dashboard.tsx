import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bookmark, BookmarkCheck, ExternalLink, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { usePreferences } from "@/hooks/use-preferences";
import { computeMatchScore } from "@/lib/matchScore";
import type { Job } from "@/types/job";

const LOCATIONS = Array.from(new Set(jobs.map((j) => j.location))).sort();
const MODES: Job["mode"][] = ["Remote", "Hybrid", "Onsite"];
const EXPERIENCES: Job["experience"][] = ["Fresher", "0-1", "1-3", "3-5"];
const SOURCES: Job["source"][] = ["LinkedIn", "Naukri", "Indeed"];
const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "match", label: "Match Score" },
  { value: "salary", label: "Salary" },
];

function formatPostedDays(ago: number): string {
  if (ago === 0) return "Today";
  if (ago === 1) return "1 day ago";
  return `${ago} days ago`;
}

/** Extract first number from salaryRange for simple numeric sort (e.g. "10–18 LPA" -> 10, "₹40k–₹60k" -> 40). */
function salarySortKey(salaryRange: string): number {
  const match = salaryRange.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function matchScoreBadgeVariant(score: number): "default" | "secondary" | "outline" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "outline";
}

function matchScoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-green-600 text-white border-green-600 hover:bg-green-600";
  if (score >= 60) return "bg-amber-500 text-white border-amber-500 hover:bg-amber-500";
  if (score >= 40) return "bg-muted text-muted-foreground";
  return "bg-muted/60 text-muted-foreground border-muted-foreground/30";
}

function JobCard({
  job,
  matchScore,
  onView,
  onSave,
  onUnsave,
  onApply,
  isSaved,
}: {
  job: Job;
  matchScore: number;
  onView: () => void;
  onSave: () => void;
  onUnsave: () => void;
  onApply: () => void;
  isSaved: boolean;
}) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg font-semibold leading-tight">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge
              variant={matchScoreBadgeVariant(matchScore)}
              className={`text-xs ${matchScoreBadgeClass(matchScore)}`}
            >
              {matchScore}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {job.source}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.mode}</span>
          <span>·</span>
          <span>{job.experience}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 pb-2">
        <p className="text-sm font-medium text-foreground">{job.salaryRange}</p>
        <p className="text-xs text-muted-foreground">
          {formatPostedDays(job.postedDaysAgo)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-4 w-4" />
          View
        </Button>
        {isSaved ? (
          <Button variant="secondary" size="sm" onClick={onUnsave}>
            <BookmarkCheck className="h-4 w-4" />
            Saved
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={onSave}>
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
        )}
        <Button size="sm" onClick={onApply}>
          <ExternalLink className="h-4 w-4" />
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { saveJob, unsaveJob, isSaved } = useSavedJobs();
  const { preferences } = usePreferences();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");
  const [experience, setExperience] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [sort, setSort] = useState<string>("latest");
  const [showOnlyAboveThreshold, setShowOnlyAboveThreshold] = useState(false);
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const hasSetPreferences = useMemo(() => {
    return (
      preferences.roleKeywords.trim() !== "" ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.experienceLevel !== "" ||
      preferences.skills.trim() !== ""
    );
  }, [preferences]);

  const jobsWithScores = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: computeMatchScore(job, preferences),
    }));
  }, [preferences]);

  const filteredAndSorted = useMemo(() => {
    let list = [...jobsWithScores];

    const kw = keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter(
        ({ job: j }) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw),
      );
    }
    if (location !== "all")
      list = list.filter(({ job: j }) => j.location === location);
    if (mode !== "all") list = list.filter(({ job: j }) => j.mode === mode);
    if (experience !== "all")
      list = list.filter(({ job: j }) => j.experience === experience);
    if (source !== "all")
      list = list.filter(({ job: j }) => j.source === source);

    if (showOnlyAboveThreshold) {
      const threshold = preferences.minMatchScore;
      list = list.filter(({ matchScore }) => matchScore >= threshold);
    }

    if (sort === "latest") {
      list.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    } else if (sort === "oldest") {
      list.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    } else if (sort === "match") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sort === "salary") {
      list.sort(
        (a, b) =>
          salarySortKey(b.job.salaryRange) - salarySortKey(a.job.salaryRange),
      );
    }

    return list;
  }, [
    jobsWithScores,
    keyword,
    location,
    mode,
    experience,
    source,
    showOnlyAboveThreshold,
    preferences.minMatchScore,
    sort,
  ]);

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        <h1 className="font-heading text-2xl font-semibold">
          Job Notification Tracker
        </h1>

        {!hasSetPreferences && (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
            <p className="text-foreground">
              Set your preferences to activate intelligent matching.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/settings")}
              className="shrink-0"
            >
              <Settings className="h-4 w-4" />
              Preferences
            </Button>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or company..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modes</SelectItem>
              {MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All experience</SelectItem>
              {EXPERIENCES.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              {SOURCES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Show only matches toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="show-only-matches"
            checked={showOnlyAboveThreshold}
            onCheckedChange={setShowOnlyAboveThreshold}
          />
          <Label htmlFor="show-only-matches" className="cursor-pointer text-sm">
            Show only jobs above my threshold
          </Label>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredAndSorted.length} job{filteredAndSorted.length !== 1 ? "s" : ""} found
        </p>

        {/* Job grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              matchScore={matchScore}
              onView={() => setViewJob(job)}
              onSave={() => saveJob(job.id)}
              onUnsave={() => unsaveJob(job.id)}
              onApply={() =>
                window.open(job.applyUrl, "_blank", "noopener,noreferrer")
              }
              isSaved={isSaved(job.id)}
            />
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-sp-5 text-center">
            <p className="font-medium text-foreground">
              No roles match your criteria.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Adjust filters or lower threshold.
            </p>
          </div>
        )}
      </div>

      {/* View job modal */}
      <Dialog open={!!viewJob} onOpenChange={(open) => !open && setViewJob(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {viewJob && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">{viewJob.title}</DialogTitle>
                <DialogDescription>
                  {viewJob.company} · {viewJob.location} · {viewJob.mode}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">{viewJob.description}</p>
                <div>
                  <p className="mb-2 text-sm font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {viewJob.skills.map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {viewJob.salaryRange} · {formatPostedDays(viewJob.postedDaysAgo)} · {viewJob.source}
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    window.open(viewJob.applyUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Apply on {viewJob.source}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
