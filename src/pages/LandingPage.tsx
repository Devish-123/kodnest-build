import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Target, 
  BookOpen, 
  ClipboardCheck, 
  Briefcase,
  GraduationCap,
  BarChart3,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Targeted Practice",
    description: "Focus on the skills that matter with curated coding problems and exercises.",
  },
  {
    icon: ClipboardCheck,
    title: "Skill Assessments",
    description: "Evaluate your readiness with comprehensive assessments and detailed feedback.",
  },
  {
    icon: Briefcase,
    title: "Interview Prep",
    description: "Master technical and behavioral interviews with expert-curated resources.",
  },
  {
    icon: GraduationCap,
    title: "Learning Paths",
    description: "Follow structured learning paths designed to take you from novice to job-ready.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics and milestone achievements.",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description: "Get AI-powered recommendations tailored to your goals and skill level.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-sp-4 py-sp-2">
          <div className="flex items-center gap-sp-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-semibold text-foreground">
              PlacementReady
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-sp-3">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-kn-base">
              Features
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-kn-base">
              About
            </a>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-3xl text-center z-10">
          <div className="inline-flex items-center gap-sp-1 rounded-full bg-primary/10 px-sp-2 py-1 text-sm text-primary mb-sp-3">
            <Sparkles className="h-4 w-4" />
            <span>Launch Your Career with Confidence</span>
          </div>
          
          <h1 className="font-heading text-5xl font-semibold leading-tight md:text-6xl text-foreground">
            Master Your{" "}
            <span className="text-primary">Placement Journey</span>
          </h1>
          
          <p className="mx-auto mt-sp-3 text-lg text-muted-foreground max-w-prose">
            Comprehensive preparation platform for technical interviews, skill assessments, 
            and career readiness. Your path to dream companies starts here.
          </p>
          
          <div className="mt-sp-4 flex flex-col sm:flex-row items-center justify-center gap-sp-2">
            <Button
              size="lg"
              className="gap-sp-1 min-w-[180px]"
              onClick={() => navigate("/dashboard")}
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[180px]"
              onClick={() => navigate("/practice")}
            >
              Explore Practice
            </Button>
          </div>
          
          <div className="mt-sp-5 flex items-center justify-center gap-sp-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-sp-0.5">
              <BookOpen className="h-4 w-4" />
              <span>500+ Problems</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-sp-0.5">
              <Target className="h-4 w-4" />
              <span>100+ Companies</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-sp-0.5">
              <BarChart3 className="h-4 w-4" />
              <span>Detailed Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-sp-4 py-sp-5 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-sp-4">
            <h2 className="font-heading text-3xl font-semibold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="mt-sp-2 text-muted-foreground max-w-prose mx-auto">
              A complete toolkit designed to help you ace your placements and land your dream job.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-sp-3 transition-all duration-kn-base hover:shadow-lg hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary mb-sp-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-kn-base">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-sp-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-sp-4 py-sp-5">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-gradient-to-r from-primary to-primary/90 px-sp-4 py-sp-5 text-center">
            <h2 className="font-heading text-3xl font-semibold text-primary-foreground mb-sp-2">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 max-w-prose mx-auto mb-sp-3">
              Join thousands of students who have successfully landed their dream jobs 
              through structured preparation and consistent practice.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="gap-sp-1"
              onClick={() => navigate("/dashboard")}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-auto">
        <div className="mx-auto max-w-5xl px-sp-4 py-sp-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-sp-2">
            <div className="flex items-center gap-sp-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">
                PlacementReady
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PlacementReady. All rights reserved.
            </p>
            <div className="flex items-center gap-sp-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-kn-base">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-kn-base">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-kn-base">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
