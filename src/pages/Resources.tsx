import { BookOpen, FileText, Video, Link2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Resources = () => {
  return (
    <div className="flex flex-1 flex-col px-sp-4 py-sp-4">
      <div className="mx-auto w-full max-w-5xl space-y-sp-4">
        {/* Page Header */}
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            Resources
          </h1>
          <p className="mt-sp-1 text-muted-foreground">
            Curated study materials, guides, and reference documents for your preparation.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sp-2">
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">250+</p>
                <p className="text-xs text-muted-foreground">Articles</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">100+</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/10 text-warning">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">50+</p>
                <p className="text-xs text-muted-foreground">External Links</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-sp-2 p-sp-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">75+</p>
                <p className="text-xs text-muted-foreground">Downloads</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-sp-1">
              <BookOpen className="h-5 w-5 text-primary" />
              Study Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sp-3">
            <p className="text-muted-foreground">
              The resources section is currently under development. Soon you'll be able to:
            </p>
            <ul className="space-y-sp-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Access curated study guides and cheat sheets</li>
              <li>Watch video tutorials and explanations</li>
              <li>Download practice papers and solutions</li>
              <li>Explore company-specific preparation material</li>
              <li>Save favorite resources for quick access</li>
            </ul>
            <Button className="mt-sp-2">Browse Resources</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
