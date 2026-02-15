import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus, type JobStatus, STATUSES } from "@/hooks/use-job-status";
import { getStatusToggleClass } from "@/lib/status-utils";
import { toast } from "sonner";
import type { Job } from "@/types/job";
import { useState } from "react";

function formatPostedDays(ago: number): string {
  if (ago === 0) return "Today";
  if (ago === 1) return "1 day ago";
  return `${ago} days ago`;
}

function SavedJobCard({
  job,
  currentStatus,
  onStatusChange,
  onView,
  onRemove,
  onApply,
}: {
  job: Job;
  currentStatus: JobStatus;
  onStatusChange: (status: JobStatus) => void;
  onView: () => void;
  onRemove: () => void;
  onApply: () => void;
}) {
  return (
    <Card className="flex flex-col transition-all duration-180 ease-in-out hover:shadow-md">
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
        <div className="pt-1">
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Status</p>
          <ToggleGroup
            type="single"
            value={currentStatus}
            onValueChange={(value) => {
              if (value) onStatusChange(value as JobStatus);
            }}
            className="flex-wrap"
          >
            {STATUSES.map((status) => (
              <ToggleGroupItem
                key={status}
                value={status}
                size="sm"
                className={`h-7 px-2 text-xs ${getStatusToggleClass(status, currentStatus === status)}`}
              >
                {status}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t border-border pt-sp-3">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-4 w-4" />
          View
        </Button>
        <Button variant="secondary" size="sm" onClick={onRemove}>
          <Bookmark className="h-4 w-4" />
          Remove
        </Button>
        <Button size="sm" onClick={onApply}>
          <ExternalLink className="h-4 w-4" />
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
}

const Saved = () => {
  const navigate = useNavigate();
  const { savedIds, unsaveJob } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = useMemo(() => {
    const set = new Set(savedIds);
    return jobs.filter((j) => set.has(j.id));
  }, [savedIds]);

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary/30 bg-primary/5">
            <Bookmark className="h-10 w-10 text-primary/60" />
          </div>
          <h2 className="mt-sp-4 font-heading text-2xl font-semibold text-foreground">
            No saved jobs yet
          </h2>
          <p className="mt-sp-2 text-muted-foreground leading-relaxed">
            Save jobs from the Dashboard to keep them here for quick access.
            Your saved list is stored locally and stays private.
          </p>
          <Button
            variant="default"
            className="mt-sp-4"
            onClick={() => navigate("/dashboard")}
          >
            Browse jobs on Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        <div className="flex flex-col gap-sp-1">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Saved jobs</h1>
          <p className="text-sm text-muted-foreground">
            {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        <div className="grid gap-sp-3 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <SavedJobCard
              key={job.id}
              job={job}
              currentStatus={getStatus(job.id)}
              onStatusChange={(newStatus) => {
                setStatus(job.id, newStatus);
                if (newStatus !== "Not Applied") {
                  toast(`Status updated: ${newStatus}`);
                }
              }}
              onView={() => setViewJob(job)}
              onRemove={() => unsaveJob(job.id)}
              onApply={() =>
                window.open(job.applyUrl, "_blank", "noopener,noreferrer")
              }
            />
          ))}
        </div>
      </div>

      <Dialog
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      >
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {viewJob && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">
                  {viewJob.title}
                </DialogTitle>
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
                  {viewJob.salaryRange} ·{" "}
                  {formatPostedDays(viewJob.postedDaysAgo)} · {viewJob.source}
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    window.open(
                      viewJob.applyUrl,
                      "_blank",
                      "noopener,noreferrer",
                    );
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

export default Saved;