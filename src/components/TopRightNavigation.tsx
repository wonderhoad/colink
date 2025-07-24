import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  
  const getNotificationTitle = () => {
    if (userRole === 'student') {
      return "New quest available! Complete Assignment #3 for 150 XP";
    } else {
      return "3 students completed your latest quest";
    }
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