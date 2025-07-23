import { GraduationCap, Users, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Coventry University Astana
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            Gamified Learning Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Engage in academic excellence through quests, badges, and friendly competition. 
            Choose your role to begin your journey.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link to="/student/dashboard">
            <Card className="shadow-primary hover:shadow-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">I'm a Student 🎓</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Complete quests, earn XP, unlock badges, and climb the leaderboard
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Complete Academic Quests</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>Earn Badges & XP</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Compete on Leaderboards</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Enter as Student
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/professor/dashboard">
            <Card className="shadow-primary hover:shadow-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">I'm a Professor 👩‍🏫</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Create quests, track engagement, award badges, and analyze student progress
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Create Learning Quests</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>Award Student Badges</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Track Student Analytics</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Enter as Professor
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            Powered by modern web technology • Built for academic excellence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
