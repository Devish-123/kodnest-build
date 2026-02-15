import { useMemo, useState } from "react";
import { ShieldCheck, ClipboardCheck, Link2, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { toast } from "sonner";

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
    <div className="flex flex-1 flex-col px-sp-4 py-sp-5">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <ShieldCheck className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mt-sp-3 text-2xl font-semibold">Proof & Artifacts</h2>
          <p className="mt-sp-1 max-w-xl text-muted-foreground">
            Capture your final proof, connect artifact links, and export the submission summary.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Step Completion Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Test checklist</p>
                <p className="text-sm text-muted-foreground">
                  {checkedCount} / {totalCount} complete
                </p>
              </div>
              <Badge variant="outline" className={allChecked ? "border-green-200 text-green-700" : "border-amber-200 text-amber-700"}>
                {allChecked ? "Complete" : "In progress"}
              </Badge>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Artifact links</p>
                <p className="text-sm text-muted-foreground">
                  {validArtifactCount} / {ARTIFACT_FIELDS.length} valid
                </p>
              </div>
              <Badge variant="outline" className={allArtifactsValid ? "border-green-200 text-green-700" : "border-amber-200 text-amber-700"}>
                {allArtifactsValid ? "Complete" : "Needs attention"}
              </Badge>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Ship status</p>
                <p className="text-sm text-muted-foreground">
                  {shipReady
                    ? "All checks satisfied. Ready to ship."
                    : "Complete checklist + valid links to ship."}
                </p>
              </div>
              <Badge
                variant="outline"
                className={shipReady ? "border-green-200 text-green-700" : "border-amber-200 text-amber-700"}
              >
                {shipReady ? "Ready" : "Blocked"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              Artifact Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ARTIFACT_FIELDS.map((field) => {
              const errorMessage = getArtifactError(field.id);
              const showError = Boolean(touched[field.id]) && Boolean(errorMessage);
              return (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {isArtifactValid(field.id) ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
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
                  {showError && <p className="text-xs text-amber-600">{errorMessage}</p>}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className={shipReady ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50"}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
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
            <CardTitle className="text-base flex items-center gap-2">
              <Copy className="h-4 w-4 text-muted-foreground" />
              Final Submission Copy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={submissionCopy} readOnly className="min-h-[180px]" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Use this summary in your final submission or release notes.
              </p>
              <Button onClick={handleCopy} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy summary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Proof;
