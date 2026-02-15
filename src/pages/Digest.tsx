import { useEffect, useState } from "react";
import { usePreferences } from "@/hooks/use-preferences";
import { jobs } from "@/data/jobs";
import { computeMatchScore } from "@/lib/matchScore";
import type { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Copy, RefreshCw, Briefcase, MapPin, Building2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Digest = () => {
  const { preferences, hasPreferences } = usePreferences();
  const [digest, setDigest] = useState<Job[] | null>(null);
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

    // 1. Calculate scores
    const scoredJobs = jobs.map((job) => ({
      ...job,
      score: computeMatchScore(job, preferences),
    }));

    // 2. Filter & Sort
    // Filter out 0 scores or modify threshold as needed. 
    // Requirement says "top 10 jobs sorted by matchScore desc, postedDaysAgo asc"
    // We'll keep even low scores if they are the best available, unless 0 implies no match at all?
    // Let's filter score > 0 to be relevant.
    const relevantJobs = scoredJobs.filter((j) => j.score > 0);

    relevantJobs.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Descending match score
      }
      return a.postedDaysAgo - b.postedDaysAgo; // Ascending posted days (fresher first)
    });

    // 3. Take top 10
    const top10 = relevantJobs.slice(0, 10);

    if (top10.length === 0) {
      toast.info("No matching jobs found today. Try broadening your preferences.");
      return;
    }

    // 4. Store
    const today = getTodayDateString();
    localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(top10));
    setDigest(top10);
    toast.success("Today's digest generated!");
  };

  const handleCopy = () => {
    if (!digest) return;
    const text = digest
      .map(
        (job, i) =>
          `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} | Match: ${computeMatchScore(job, preferences)}%\n   Link: ${job.applyUrl}\n`
      )
      .join("\n");
    
    const header = `My Job Digest - ${generatedDate}\n\n`;
    navigator.clipboard.writeText(header + text).then(() => {
      toast.success("Digest copied to clipboard");
    });
  };

  const handleEmail = () => {
    if (!digest) return;
    const subject = encodeURIComponent(`My 9AM Job Digest - ${generatedDate}`);
    const bodyText = digest
      .map(
        (job, i) =>
          `${i + 1}. ${job.title} at ${job.company}%0D%0ALocation: ${job.location} | Match: ${computeMatchScore(job, preferences)}%%0D%0ALink: ${job.applyUrl}%0D%0A`
      )
      .join("%0D%0A");
    
    const body = encodeURIComponent(`Here is my job digest for today:\n\n`) + bodyText;
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // State 1: No Preferences
  if (!hasPreferences()) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 animate-fade-in">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
              <Briefcase className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>Personalize Your Digest</CardTitle>
            <CardDescription>
              We need to know what you're looking for to generate your daily digest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
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
      <div className="flex flex-1 flex-col items-center justify-center p-6 animate-fade-in">
        <div className="flex flex-col items-center text-center max-w-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Today's 9AM Digest</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Ready to see your top 10 tailored job matches for {generatedDate}?
          </p>
          
          <Button size="lg" onClick={generateDigest} className="gap-2 px-8">
            <Mail className="h-5 w-5" />
            Generate Digest (Simulated)
          </Button>

          <p className="mt-8 text-xs text-muted-foreground/60">
            Demo Mode: Daily 9AM trigger simulated manually. 
            <br />
            Digest persists for the rest of the day.
          </p>
        </div>
      </div>
    );
  }

  // State 3: Digest View
  return (
    <div className="container max-w-4xl py-8 animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Top 10 Jobs For You</h1>
          <p className="text-muted-foreground">9AM Digest — {generatedDate}</p>
        </div>
        <div className="flex gap-2">
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

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-muted/30 p-4 border-b">
          <p className="text-sm text-center text-muted-foreground font-medium">
             Hand-picked based on your preferences
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="p-6 space-y-6">
            {digest.map((job, index) => {
              const score = computeMatchScore(job, preferences);
              return (
                <div key={job.id} className="group relative bg-white dark:bg-zinc-950 border rounded-lg p-5 transition-all hover:shadow-md hover:border-primary/20">
                  <div className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm z-10">
                    {index + 1}
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between md:justify-start gap-3">
                         <h3 className="font-semibold text-lg leading-none">{job.title}</h3>
                         <Badge variant={score >= 80 ? "default" : "secondary"} className="h-5 text-[10px]">
                           {score}% Match
                         </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{job.company}</span>
                        <span>•</span>
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{job.location} ({job.mode})</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.slice(0, 4).map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="text-xs text-muted-foreground self-center">+{job.skills.length - 4}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end justify-between gap-3 min-w-[140px]">
                       <div className="text-xs text-muted-foreground">
                         Posted {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
                       </div>
                       <Button size="sm" className="w-full md:w-auto" asChild>
                         <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
                       </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {digest.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No matches found today. Try adjusting your preferences.
                </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="bg-muted/30 p-4 border-t text-center">
           <p className="text-xs text-muted-foreground">
             This digest was generated based on your preferences. Jobs are simulated for demo purposes.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Digest;
