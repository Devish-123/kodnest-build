import { useMemo, useState } from "react";
import { Search, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import type { Job } from "@/types/job";

const LOCATIONS = Array.from(new Set(jobs.map((j) => j.location))).sort();
const MODES: Job["mode"][] = ["Remote", "Hybrid", "Onsite"];
const EXPERIENCES: Job["experience"][] = ["Fresher", "0-1", "1-3", "3-5"];
const SOURCES: Job["source"][] = ["LinkedIn", "Naukri", "Indeed"];
const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

function formatPostedDays(ago: number): string {
  if (ago === 0) return "Today";
  if (ago === 1) return "1 day ago";
  return `${ago} days ago`;
}

function JobCard({
  job,
  onView,
  onSave,
  onUnsave,
  onApply,
  isSaved,
}: {
  job: Job;
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
          <Badge variant="secondary" className="shrink-0 text-xs">
            {job.source}
          </Badge>
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
  const { saveJob, unsaveJob, isSaved } = useSavedJobs();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [mode, setMode] = useState<string>("all");
  const [experience, setExperience] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [sort, setSort] = useState<string>("latest");
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const filteredAndSorted = useMemo(() => {
    let list = [...jobs];

    const kw = keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw),
      );
    }
    if (location !== "all")
      list = list.filter((j) => j.location === location);
    if (mode !== "all") list = list.filter((j) => j.mode === mode);
    if (experience !== "all")
      list = list.filter((j) => j.experience === experience);
    if (source !== "all") list = list.filter((j) => j.source === source);

    if (sort === "latest") {
      list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else {
      list.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    }

    return list;
  }, [keyword, location, mode, experience, source, sort]);

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        <h1 className="font-heading text-2xl font-semibold">
          Job Notification Tracker
        </h1>

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

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredAndSorted.length} job{filteredAndSorted.length !== 1 ? "s" : ""} found
        </p>

        {/* Job grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={() => setViewJob(job)}
              onSave={() => saveJob(job.id)}
              onUnsave={() => unsaveJob(job.id)}
              onApply={() => window.open(job.applyUrl, "_blank", "noopener,noreferrer")}
              isSaved={isSaved(job.id)}
            />
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="rounded-lg border border-dashed bg-muted/30 py-sp-5 text-center text-muted-foreground">
            No jobs match your filters. Try adjusting the criteria.
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
