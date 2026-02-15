import { useEffect, useState } from "react";
import { usePreferences } from "@/hooks/use-preferences";
import { useJobStatus, type JobStatus } from "@/hooks/use-job-status";
import { jobs } from "@/data/jobs";
import { computeMatchScore } from "@/lib/matchScore";
import { getStatusBadgeClass, formatStatusDate } from "@/lib/status-utils";
import type { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Copy, RefreshCw, Briefcase, MapPin, Building2, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type DigestJob = Job & { matchScore: number };

const Digest = () => {
  const { preferences, hasPreferences } = usePreferences();
  const { recentUpdates } = useJobStatus();
  const [digest, setDigest] = useState<DigestJob[] | null>(null);
  const [generatedDate, setGeneratedDate] = useState<string>("");

  // Get today's date string YYYY-MM-DD
  const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const today = getTodayDateString();
    setGeneratedDate(today);

    // Check for existing digest
    const storedDigest = localStorage.getItem(`jobTrackerDigest_${today}`);
    if (storedDigest) {
      try {
        setDigest(JSON.parse(storedDigest));
      } catch (e) {
        console.error("Failed to parse digest", e);
        localStorage.removeItem(`jobTrackerDigest_${today}`);
      }
    }
  }, []);

  const generateDigest = () => {
    if (!hasPreferences()) {
      toast.error("Please set your preferences first!");
      return;
    }

    // 1. Calculate scores and create DigestJobs with persisted match scores
    const scoredJobs: DigestJob[] = jobs.map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, preferences),
    }));

    // 2. Filter & Sort
    // Filter out jobs with 0 match score
    const relevantJobs = scoredJobs.filter((j) => j.matchScore > 0);

    relevantJobs.sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore; // Descending match score
      }
      return a.postedDaysAgo - b.postedDaysAgo; // Ascending posted days (fresher first)
    });

    // 3. Take top 10
    const top10 = relevantJobs.slice(0, 10);

    // 4. Store digest (even if empty) and update state
    const today = getTodayDateString();
    localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(top10));
    setDigest(top10);
    
    if (top10.length === 0) {
      toast.info("No matching jobs found today. Try broadening your preferences.");
    } else {
      toast.success("Today's digest generated!");
    }
  };

  const handleCopy = () => {
    if (!digest) return;
    
    if (digest.length === 0) {
      const emptyText = `My 9AM Job Digest - ${generatedDate}\n\nNo matching roles today. Try broadening your preferences.`;
      navigator.clipboard.writeText(emptyText).then(() => {
        toast.success("Digest copied to clipboard");
      });
      return;
    }
    
    const text = digest
      .map(
        (job, i) =>
          `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location}\n   Experience: ${job.experience}\n   Match Score: ${job.matchScore}%\n   Apply: ${job.applyUrl}\n`
      )
      .join("\n");
    
    const header = `My 9AM Job Digest - ${generatedDate}\n\n`;
    navigator.clipboard.writeText(header + text).then(() => {
      toast.success("Digest copied to clipboard");
    });
  };

  const handleEmail = () => {
    if (!digest) return;
    
    const subject = encodeURIComponent("My 9AM Job Digest");
    
    if (digest.length === 0) {
      const body = encodeURIComponent(`My 9AM Job Digest - ${generatedDate}\n\nNo matching roles today. Try broadening your preferences.`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
      return;
    }
    
    const bodyText = digest
      .map(
        (job, i) =>
          `${i + 1}. ${job.title} at ${job.company}%0D%0ALocation: ${job.location}%0D%0AExperience: ${job.experience}%0D%0AMatch Score: ${job.matchScore}%%0D%0AApply: ${job.applyUrl}%0D%0A`
      )
      .join("%0D%0A");
    
    const body = encodeURIComponent(`My 9AM Job Digest - ${generatedDate}\n\n`) + bodyText;
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // State 1: No Preferences
  if (!hasPreferences()) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-sp-3">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-foreground">Personalize Your Digest</CardTitle>
            <CardDescription>
              We need to know what you're looking for to generate your daily digest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-sp-3">
              Set your preferred roles, skills, and locations to get started.
            </p>
            <Button asChild className="w-full">
              <Link to="/settings">Set Preferences</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // State 2: Pre-generation (No digest for today yet)
  if (!digest) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
        <div className="flex flex-col items-center text-center max-w-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-sp-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-sp-3 text-foreground">Today's 9AM Digest</h2>
          <p className="text-muted-foreground mb-sp-4 text-lg">
            Ready to see your top 10 tailored job matches for {generatedDate}?
          </p>
          
          <Button size="lg" onClick={generateDigest} className="gap-2 px-sp-4">
            <Mail className="h-5 w-5" />
            Generate Today's 9AM Digest (Simulated)
          </Button>

          <p className="mt-sp-4 text-xs text-muted-foreground/60">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      </div>
    );
  }

  // State 3: Digest View (including empty digest state)
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-4xl space-y-sp-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-sp-3">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-foreground">Your 9AM Job Digest</h1>
            <p className="text-muted-foreground">Daily personalized matches — {generatedDate}</p>
          </div>
          <div className="flex gap-sp-2">
            <Button variant="outline" onClick={handleCopy} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="default" onClick={handleEmail} className="gap-2">
              <Mail className="h-4 w-4" />
              Email Draft
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
          <div className="bg-muted/30 p-sp-4 border-b border-border text-center">
            <h2 className="font-heading text-xl font-semibold mb-1 text-foreground">9AM Digest — {generatedDate}</h2>
            <p className="text-sm text-muted-foreground">
              {digest.length === 0 
                ? "No matching roles today" 
                : "Your top personalized job matches, delivered daily"}
            </p>
          </div>

          {digest.length === 0 ? (
            <div className="p-sp-5 text-center space-y-sp-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No matching roles today</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  We couldn't find any jobs matching your current preferences. Try broadening your criteria in settings.
                </p>
              </div>
              <Button variant="outline" asChild className="mt-sp-3">
                <Link to="/settings">Adjust Preferences</Link>
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-sp-4 space-y-sp-3">
                {digest.map((job, index) => {
                  return (
                    <div key={job.id} className="group relative bg-background border border-border rounded-md p-sp-3 transition-all duration-180 ease-in-out hover:shadow-md hover:border-primary/20">
                      <div className="absolute -left-3 top-sp-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm z-10">
                        {index + 1}
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-sp-3 justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-start justify-between md:justify-start gap-sp-2 flex-wrap">
                             <h3 className="font-heading font-semibold text-lg leading-tight text-foreground">{job.title}</h3>
                             <Badge variant={job.matchScore >= 80 ? "default" : "secondary"} className="text-xs shrink-0">
                               {job.matchScore}% Match
                             </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>{job.company}</span>
                            <span>·</span>
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{job.location}</span>
                            <span>·</span>
                            <span>{job.mode}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>Experience: {job.experience} years</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {job.skills.slice(0, 5).map(skill => (
                              <Badge key={skill} variant="outline" className="text-xs font-normal">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 5 && (
                              <span className="text-xs text-muted-foreground self-center">+{job.skills.length - 5} more</span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end justify-between gap-sp-2 md:min-w-[140px]">
                           <div className="text-xs text-muted-foreground">
                             Posted {job.postedDaysAgo === 0 ? "today" : `${job.postedDaysAgo}d ago`}
                           </div>
                           <Button size="sm" className="w-full md:w-auto" asChild>
                             <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
                           </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          <div className="bg-muted/30 p-sp-3 border-t border-border text-center">
             <p className="text-xs text-muted-foreground">
               Demo Mode: This digest was generated based on your preferences. Jobs are simulated for demonstration purposes.
             </p>
          </div>
        </div>

        {/* Recent Status Updates Section */}
        {recentUpdates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5" />
                Recent Status Updates
              </CardTitle>
              <CardDescription>
                Track your recent job application status changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-sp-2">
                {recentUpdates.map((update) => {
                  const job = jobs.find((j) => j.id === update.jobId);
                  if (!job) return null;

                  return (
                    <div
                      key={`${update.jobId}-${update.changedAt}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-md border border-border p-sp-2 bg-card"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm text-foreground">{job.title}</h4>
                          <Badge
                            className={`text-xs ${getStatusBadgeClass(update.status)}`}
                          >
                            {update.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground sm:text-right">
                        {formatStatusDate(update.changedAt)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Digest;