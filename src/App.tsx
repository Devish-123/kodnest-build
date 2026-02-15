import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardShell from "./layouts/DashboardShell";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Practice from "./pages/Practice";
import Assessments from "./pages/Assessments";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import Digest from "./pages/Digest";
import Settings from "./pages/Settings";
import Proof from "./pages/Proof";
import TestChecklist from "./pages/TestChecklist";
import Ship from "./pages/Ship";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page - No Layout */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Legacy Routes - Keep for compatibility */}
          <Route element={<AppLayout />}>
            <Route path="/legacy" element={<Index />} />
            <Route path="/dashboard-old" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<Proof />} />
            <Route path="/jt/proof" element={<Proof />} />
            <Route path="/jt/07-test" element={<TestChecklist />} />
            <Route path="/jt/08-ship" element={<Ship />} />
          </Route>
          
          {/* New Dashboard Routes with Shell */}
          <Route element={<DashboardShell />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
