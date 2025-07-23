import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/student/Dashboard";
import ProfessorDashboard from "./pages/professor/Dashboard";
import Quests from "./pages/student/Quests";

import Badges from "./pages/student/Badges";
import Leaderboard from "./pages/student/Leaderboard";
import Profile from "./pages/shared/Profile";
import Messaging from "./pages/shared/Messaging";
import QuestBuilder from "./pages/professor/QuestBuilder";
import Analytics from "./pages/professor/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quests" element={<Quests />} />
          <Route path="/student/badges" element={<Badges />} />
          <Route path="/student/leaderboard" element={<Leaderboard />} />
          
          {/* Professor Routes */}
          <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
          <Route path="/professor/quest-builder" element={<QuestBuilder />} />
          <Route path="/professor/analytics" element={<Analytics />} />
          
          {/* Shared Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/messaging" element={<Messaging />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
