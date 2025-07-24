import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TopRightNavigationProps {
  userRole: 'student' | 'professor';
  xp?: number;
  level?: number;
  coins?: number;
  notificationCount?: number;
}

const TopRightNavigation = ({ 
  userRole, 
  xp = 1250, 
  level = 8, 
  coins = 3, 
  notificationCount = 5 
}: TopRightNavigationProps) => {
  const { toast } = useToast();
  
  const getNotificationTitle = () => {
    const studentMessages = [
      "New quest available! Complete Assignment #3 for 150 XP",
      "🎉 Achievement unlocked: Study Streak Master!",
      "📚 Reminder: Quiz #2 due in 2 hours",
      "⚡ Bonus XP available for early submission",
      "🏆 You're now #3 on the leaderboard!",
      "💎 Daily login reward: +5 coins earned"
    ];
    
    const professorMessages = [
      "3 students completed your latest quest",
      "📊 Weekly analytics report is ready",
      "✅ 5 new submissions require grading",
      "🎯 Quest completion rate increased by 15%",
      "👥 New student enrolled in your course",
      "⏰ Reminder: Schedule next week's assignments"
    ];

    if (userRole === 'student') {
      return studentMessages[Math.floor(Math.random() * studentMessages.length)];
    } else {
      return professorMessages[Math.floor(Math.random() * professorMessages.length)];
    }
  };

  const handleNotificationClick = () => {
    const message = getNotificationTitle();
    toast({
      title: "🔔 Notification",
      description: message,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
      {/* Progress/Points Display */}
      <div className="flex items-center gap-3 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center gap-1">
          <span>🔥</span>
          <span className="text-sm font-medium text-primary">{xp} XP</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💎</span>
          <span className="text-sm font-medium text-primary">{coins}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⭐️</span>
          <span className="text-sm font-medium text-primary">Level {level}</span>
        </div>
      </div>

      {/* Search Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="bg-background/95 backdrop-blur-sm shadow-lg hover:bg-accent"
        title="Search"
      >
        <Search className="h-4 w-4" />
      </Button>

      {/* Notifications */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-background/95 backdrop-blur-sm shadow-lg hover:bg-accent"
          title={getNotificationTitle()}
          onClick={handleNotificationClick}
        >
          <div className="relative">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TopRightNavigation;