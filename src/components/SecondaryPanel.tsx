import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, prompt }: SecondaryPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-sp-3">
      <div>
        <h3 className="font-heading text-lg font-medium text-foreground">{stepTitle}</h3>
        <p className="mt-sp-1 text-sm text-muted-foreground">{stepDescription}</p>
      </div>

      <div className="rounded-md border border-border bg-muted/50 p-sp-2">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-body">
          {prompt}
        </pre>
      </div>

      <div className="flex flex-wrap gap-sp-1">
        <Button size="sm" variant="secondary" onClick={handleCopy}>
          {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button size="sm" variant="default">
          Build in Lovable
        </Button>
        <Button size="sm" variant="success">
          It Worked
        </Button>
        <Button size="sm" variant="destructive">
          Error
        </Button>
        <Button size="sm" variant="secondary">
          Add Screenshot
        </Button>
      </div>
    </div>
  );
};

export default SecondaryPanel;