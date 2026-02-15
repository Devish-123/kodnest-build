import TopBar from "@/components/TopBar";
import ContextHeader from "@/components/ContextHeader";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import SecondaryPanel from "@/components/SecondaryPanel";
import ProofFooter from "@/components/ProofFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info } from "lucide-react";

const DesignShowcase = () => {
  return (
    <div className="space-y-sp-4">
      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Lora for headings, DM Sans for body</CardDescription>
        </CardHeader>
        <CardContent className="space-y-sp-3">
          <h1>Heading One — Confident & Clear</h1>
          <h2>Heading Two — Structured Purpose</h2>
          <h3>Heading Three — Supporting Detail</h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            Body text set at 16px with generous line-height for comfortable reading.
            Maximum width constrained to 720px to maintain optimal line length.
            Every typographic decision serves clarity and calm.
          </p>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Consistent radii, calm transitions, clear hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-sp-2">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="mt-sp-3 flex items-center gap-sp-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>Clean borders, no heavy shadows, clear focus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-sp-2 max-w-md">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
        </CardContent>
      </Card>

      {/* Badges & Status */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status indicators with restrained color</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-sp-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </CardContent>
      </Card>

      {/* States */}
      <Card>
        <CardHeader>
          <CardTitle>Error & Empty States</CardTitle>
          <CardDescription>Never blame the user, always provide a next action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-sp-3">
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-sp-3">
            <div className="flex items-start gap-sp-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-foreground">Build failed at step 3</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The API endpoint returned an unexpected response. Try re-running the build or check your configuration.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-dashed p-sp-4 text-center">
            <Info className="mx-auto h-5 w-5 text-muted-foreground" />
            <p className="mt-sp-1 text-sm text-muted-foreground">No steps completed yet</p>
            <Button variant="secondary" size="sm" className="mt-sp-2">
              Start your first step
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spacing */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>8 · 16 · 24 · 40 · 64 — no random values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-sp-2">
            {[
              { label: "8px", size: "h-[8px] w-[8px]" },
              { label: "16px", size: "h-[16px] w-[16px]" },
              { label: "24px", size: "h-[24px] w-[24px]" },
              { label: "40px", size: "h-[40px] w-[40px]" },
              { label: "64px", size: "h-[64px] w-[64px]" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <div className={`${s.size} rounded-sm bg-primary/20`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Maximum 4 intentional colors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-sp-2">
            {[
              { name: "Background", className: "bg-background border" },
              { name: "Foreground", className: "bg-foreground" },
              { name: "Primary", className: "bg-primary" },
              { name: "Muted", className: "bg-muted border" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1">
                <div className={`h-12 w-12 rounded-lg ${c.className}`} />
                <span className="text-xs text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={5}
        status="In Progress"
      />
      <ContextHeader
        headline="Design System Reference"
        subtext="Every token, component, and pattern — verified and consistent."
      />
      <WorkspaceLayout
        primary={<DesignShowcase />}
        secondary={
          <SecondaryPanel
            stepTitle="Step 1: Foundation"
            stepDescription="The design system defines all tokens — colors, typography, spacing, and component variants — in one place."
            prompt={`Design tokens are defined in index.css and tailwind.config.ts.\n\nColors: background, foreground, primary (deep red), muted\nFonts: Lora (headings), DM Sans (body)\nSpacing: 8, 16, 24, 40, 64px`}
          />
        }
      />
      <ProofFooter />
    </div>
  );
};

export default Index;
