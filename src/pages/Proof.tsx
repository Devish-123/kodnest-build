import { useMemo, useState } from "react";
import { ShieldCheck, ClipboardCheck, Link2, Copy, CheckCircle2, AlertTriangle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { toast } from "sonner";
import ContextHeader from "@/components/ContextHeader";

const STORAGE_KEY = "job-tracker-proof-artifacts";

const ARTIFACT_FIELDS = [
  {
    id: "testEvidence",
    label: "Test checklist evidence",
    description: "Link to completed checklist screenshots or reports.",
    placeholder: "https://notion.so/test-checklist-proof",
  },
  {
    id: "buildOutput",
    label: "Build output or deploy preview",
    description: "Paste the latest build log or deployed preview URL.",
    placeholder: "https://vercel.com/preview/build",
  },
  {
    id: "releaseNotes",
    label: "Release notes / summary",
    description: "Share the final release notes or project summary doc.",
    placeholder: "https://docs.google.com/document/d/release-notes",
  },
] as const;

type ArtifactFieldId = (typeof ARTIFACT_FIELDS)[number]["id"];

const DEFAULT_ARTIFACTS = ARTIFACT_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.id]: "" }),
  {} as Record<ArtifactFieldId, string>,
);

const loadArtifacts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_ARTIFACTS };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return { ...DEFAULT_ARTIFACTS };
    }
    return { ...DEFAULT_ARTIFACTS, ...(parsed as Record<string, string>) };
  } catch {
    return { ...DEFAULT_ARTIFACTS };
  }
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const Proof = () => {
  const { allChecked, checkedCount, totalCount } = useTestChecklist();
  const [artifacts, setArtifacts] = useState<Record<ArtifactFieldId, string>>(() => loadArtifacts());
  const [touched, setTouched] = useState<Partial<Record<ArtifactFieldId, boolean>>>({});

  const updateArtifact = (id: ArtifactFieldId, value: string) => {
    setArtifacts((prev) => {
      const next = { ...prev, [id]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const markTouched = (id: ArtifactFieldId) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const getArtifactError = (id: ArtifactFieldId) => {
    const value = artifacts[id]?.trim();
    if (!value) return "Add a link to continue.";
    if (!isValidUrl(value)) return "Enter a valid http/https URL.";
    return "";
  };

  const isArtifactValid = (id: ArtifactFieldId) => {
    const value = artifacts[id]?.trim();
    return Boolean(value) && isValidUrl(value);
  };

  const validArtifactCount = ARTIFACT_FIELDS.filter((field) => isArtifactValid(field.id)).length;
  const allArtifactsValid = validArtifactCount === ARTIFACT_FIELDS.length;
  const shipReady = allChecked && allArtifactsValid;
  const remainingTests = totalCount - checkedCount;
  const missingArtifacts = ARTIFACT_FIELDS.filter((field) => !isArtifactValid(field.id));

  const pendingSummary = [
    !allChecked
      ? `${remainingTests} test${remainingTests !== 1 ? "s" : ""} remaining`
      : null,
    missingArtifacts.length
      ? `Missing artifacts: ${missingArtifacts.map((field) => field.label).join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join("; ");

  const submissionCopy = useMemo(() => {
    const artifactLines = ARTIFACT_FIELDS.map((field) => {
      const value = artifacts[field.id]?.trim();
      return `- ${field.label}: ${value || "Missing"}`;
    }).join("\n");

    return `Final Proof Summary\n\nTest Checklist: ${checkedCount}/${totalCount} complete\nArtifact Links: ${validArtifactCount}/${ARTIFACT_FIELDS.length} valid\nShip Status: ${shipReady ? "Ready to ship" : "Blocked"}\n\nArtifacts:\n${artifactLines}\n\nNotes:\n${shipReady ? "All requirements satisfied. Ready for final submission." : `Pending: ${pendingSummary}`}`;
  }, [artifacts, checkedCount, totalCount, validArtifactCount, shipReady, pendingSummary]);

  const handleCopy = () => {
    navigator.clipboard.writeText(submissionCopy).then(() => {
      toast.success("Final submission copy saved to clipboard");
    });
  };

  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-3xl space-y-sp-4">
        <ContextHeader
          title="Proof & Artifacts"
          description="Capture your final proof, connect artifact links, and export the submission summary."
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-foreground">Step Completion Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <div className="flex flex-wrap items-center justify-between gap-sp-2">
              <div>
                <p className="text-sm font-medium text-foreground">Test checklist</p>
                <p className="text-sm text-muted-foreground">
                  {checkedCount} / {totalCount} complete
                </p>
              </div>
              <Badge variant="outline" className={allChecked ? "border-success/30 text-success" : "border-warning/30 text-warning"}>
                {allChecked ? "Complete" : "In progress"}
              </Badge>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-wrap items-center justify-between gap-sp-2">
              <div>
                <p className="text-sm font-medium text-foreground">Artifact links</p>
                <p className="text-sm text-muted-foreground">
                  {validArtifactCount} / {ARTIFACT_FIELDS.length} valid
                </p>
              </div>
              <Badge variant="outline" className={allArtifactsValid ? "border-success/30 text-success" : "border-warning/30 text-warning"}>
                {allArtifactsValid ? "Complete" : "Needs attention"}
              </Badge>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-wrap items-center justify-between gap-sp-2">
              <div>
                <p className="text-sm font-medium text-foreground">Ship status</p>
                <p className="text-sm text-muted-foreground">
                  {shipReady
                    ? "All checks satisfied. Ready to ship."
                    : "Complete checklist + valid links to ship."}
                </p>
              </div>
              <Badge
                variant="outline"
                className={shipReady ? "border-success/30 text-success" : "border-warning/30 text-warning"}
              >
                {shipReady ? "Ready" : "Blocked"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-foreground">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              Artifact Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            {ARTIFACT_FIELDS.map((field) => {
              const errorMessage = getArtifactError(field.id);
              const showError = Boolean(touched[field.id]) && Boolean(errorMessage);
              return (
                <div key={field.id} className="space-y-sp-1">
                  <div className="flex items-center justify-between gap-sp-1">
                    <Label htmlFor={field.id} className="text-foreground">{field.label}</Label>
                    {isArtifactValid(field.id) ? (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-warning">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Required
                      </span>
                    )}
                  </div>
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={artifacts[field.id]}
                    onChange={(event) => updateArtifact(field.id, event.target.value)}
                    onBlur={() => markTouched(field.id)}
                  />
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                  {showError && <p className="text-xs text-warning">{errorMessage}</p>}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className={shipReady ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-foreground">
              <ClipboardCheck className="h-4 w-4" />
              Ship Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {shipReady ? (
              <p>All requirements met. You can submit the final proof package.</p>
            ) : (
              <p>{pendingSummary}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-foreground">
              <Copy className="h-4 w-4 text-muted-foreground" />
              Final Submission Copy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <Textarea value={submissionCopy} readOnly className="min-h-[180px]" />
            <div className="flex flex-wrap items-center justify-between gap-sp-2">
              <p className="text-xs text-muted-foreground">
                Use this summary in your final submission or release notes.
              </p>
              <Button onClick={handleCopy} className="gap-sp-1">
                <Copy className="h-4 w-4" />
                Copy summary
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proof Footer - Checklist and Proof Inputs */}
        <div className="pt-sp-3 border-t border-border">
          <div className="flex items-center gap-sp-2 mb-sp-3">
            <ListChecks className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold text-foreground">Proof Checklist</h3>
          </div>
          <div className="grid gap-sp-3 sm:grid-cols-2">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">Required Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-sp-2 text-sm">
                  <li className="flex items-center gap-sp-2">
                    <span className={`h-4 w-4 rounded-full border ${allChecked ? 'bg-success border-success' : 'border-muted-foreground'}`} />
                    <span className={allChecked ? 'text-foreground' : 'text-muted-foreground'}>
                      Test checklist complete
                    </span>
                  </li>
                  <li className="flex items-center gap-sp-2">
                    <span className={`h-4 w-4 rounded-full border ${allArtifactsValid ? 'bg-success border-success' : 'border-muted-foreground'}`} />
                    <span className={allArtifactsValid ? 'text-foreground' : 'text-muted-foreground'}>
                      All artifacts linked
                    </span>
                  </li>
                  <li className="flex items-center gap-sp-2">
                    <span className={`h-4 w-4 rounded-full border ${shipReady ? 'bg-success border-success' : 'border-muted-foreground'}`} />
                    <span className={shipReady ? 'text-foreground' : 'text-muted-foreground'}>
                      Ready to ship
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-sp-2">
                  <p className="text-sm text-muted-foreground">
                    Access your test and ship pages for final validation.
                  </p>
                  <div className="flex flex-wrap gap-sp-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/jt/07-test">Test Checklist</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/jt/08-ship">Ship Page</a>
                    </Button>
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

export default Proof;