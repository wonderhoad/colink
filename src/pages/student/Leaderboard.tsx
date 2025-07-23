import { ArrowLeft, Trophy, Medal, Star, TrendingUp, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const currentUser = "Alex Thompson";
  
  const weeklyLeaderboard = [
    { rank: 1, name: "Maria Garcia", xp: 2450, level: 12, badges: 15, weeklyXP: 380, avatar: "MG" },
    { rank: 2, name: "David Chen", xp: 2380, level: 11, badges: 14, weeklyXP: 360, avatar: "DC" },
    { rank: 3, name: "Sarah Ahmed", xp: 2290, level: 11, badges: 13, weeklyXP: 340, avatar: "SA" },
    { rank: 4, name: "Alex Thompson", xp: 2250, level: 10, badges: 12, weeklyXP: 320, avatar: "AT", isCurrentUser: true },
    { rank: 5, name: "James Wilson", xp: 2180, level: 10, badges: 11, weeklyXP: 290, avatar: "JW" },
    { rank: 6, name: "Lisa Park", xp: 2120, level: 10, badges: 10, weeklyXP: 280, avatar: "LP" },
    { rank: 7, name: "Mohammed Ali", xp: 2080, level: 9, badges: 10, weeklyXP: 260, avatar: "MA" },
    { rank: 8, name: "Anna Kowalski", xp: 2020, level: 9, badges: 9, weeklyXP: 240, avatar: "AK" },
    { rank: 9, name: "Ryan Foster", xp: 1980, level: 9, badges: 9, weeklyXP: 220, avatar: "RF" },
    { rank: 10, name: "Emma Davis", xp: 1950, level: 9, badges: 8, weeklyXP: 200, avatar: "ED" }
  ];

  const monthlyLeaderboard = [
    { rank: 1, name: "David Chen", xp: 2380, level: 11, badges: 14, monthlyXP: 1200, avatar: "DC" },
    { rank: 2, name: "Maria Garcia", xp: 2450, level: 12, badges: 15, monthlyXP: 1180, avatar: "MG" },
    { rank: 3, name: "Alex Thompson", xp: 2250, level: 10, badges: 12, monthlyXP: 1150, avatar: "AT", isCurrentUser: true },
    { rank: 4, name: "Sarah Ahmed", xp: 2290, level: 11, badges: 13, monthlyXP: 1100, avatar: "SA" },
    { rank: 5, name: "James Wilson", xp: 2180, level: 10, badges: 11, monthlyXP: 1050, avatar: "JW" },
    { rank: 6, name: "Lisa Park", xp: 2120, level: 10, badges: 10, monthlyXP: 1000, avatar: "LP" },
    { rank: 7, name: "Mohammed Ali", xp: 2080, level: 9, badges: 10, monthlyXP: 980, avatar: "MA" },
    { rank: 8, name: "Anna Kowalski", xp: 2020, level: 9, badges: 9, monthlyXP: 950, avatar: "AK" },
    { rank: 9, name: "Ryan Foster", xp: 1980, level: 9, badges: 9, monthlyXP: 920, avatar: "RF" },
    { rank: 10, name: "Emma Davis", xp: 1950, level: 9, badges: 8, monthlyXP: 900, avatar: "ED" }
  ];

  const facultyStats = [
    { faculty: "Computer Science", students: 45, avgXP: 2180, topStudent: "Maria Garcia" },
    { faculty: "Business Administration", students: 38, avgXP: 1950, topStudent: "David Chen" },
    { faculty: "Engineering", students: 52, avgXP: 2050, topStudent: "Sarah Ahmed" },
    { faculty: "Mathematics", students: 29, avgXP: 1890, topStudent: "Alex Thompson" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser?: boolean) => {
    if (isCurrentUser) return "bg-primary/10 border-primary/30 border-2";
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
      case 2: return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 3: return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      default: return "bg-white border-border";
    }
  };

  const LeaderboardCard = ({ data, timeframe }: { data: any[], timeframe: 'weekly' | 'monthly' }) => (
    <div className="space-y-3">
      {data.map((student) => (
        <Card key={student.rank} className={`${getRankBg(student.rank, student.isCurrentUser)} hover:shadow-card transition-all duration-300`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0 w-12 flex justify-center">
                {getRankIcon(student.rank)}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {student.avatar}
              </div>

              {/* Student Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold truncate ${student.isCurrentUser ? 'text-primary' : ''}`}>
                    {student.name}
                  </h3>
                  {student.isCurrentUser && (
                    <Badge variant="outline" className="text-xs border-primary text-primary">You</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Level {student.level} • {student.badges} badges</p>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-primary">{student.xp.toLocaleString()} XP</div>
                <div className="text-sm text-muted-foreground">
                  +{timeframe === 'weekly' ? student.weeklyXP : student.monthlyXP} this {timeframe === 'weekly' ? 'week' : 'month'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/student/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Leaderboard 🏆
            </h1>
            <p className="text-muted-foreground">See how you rank against your peers</p>
          </div>
        </div>

        {/* Current User Stats */}
        <Card className="shadow-primary border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#4</div>
                <p className="text-sm text-muted-foreground">Weekly Rank</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#3</div>
                <p className="text-sm text-muted-foreground">Monthly Rank</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,250</div>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+320</div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="faculty" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              By Faculty
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Weekly Rankings
                </CardTitle>
                <p className="text-sm text-muted-foreground">Based on XP earned this week</p>
              </CardHeader>
              <CardContent>
                <LeaderboardCard data={weeklyLeaderboard} timeframe="weekly" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Monthly Rankings
                </CardTitle>
                <p className="text-sm text-muted-foreground">Based on XP earned this month</p>
              </CardHeader>
              <CardContent>
                <LeaderboardCard data={monthlyLeaderboard} timeframe="monthly" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Faculty Statistics
                </CardTitle>
                <p className="text-sm text-muted-foreground">Performance by academic faculty</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyStats.map((faculty, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{faculty.faculty}</h3>
                            <p className="text-sm text-muted-foreground">
                              {faculty.students} students • Top: {faculty.topStudent}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{faculty.avgXP}</div>
                            <p className="text-sm text-muted-foreground">Avg XP</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;