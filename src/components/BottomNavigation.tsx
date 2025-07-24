import { Target, Users, User, Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  userRole: 'student' | 'professor';
  xp?: number;
  level?: number;
  coins?: number;
  notificationCount?: number;
}

const BottomNavigation = ({ 
  userRole, 
  xp = 1250, 
  level = 8, 
  coins = 3, 
  notificationCount = 5 
}: BottomNavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const getButtonClass = (path: string) => 
    `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
      isActive(path) 
        ? 'bg-primary text-primary-foreground' 
        : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
    }`;

  const studentNav = [
    { icon: Target, label: 'Quests', path: '/student/quests' },
    { icon: Users, label: 'Leaderboard', path: '/student/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const professorNav = [
    { icon: Target, label: 'Quests', path: '/professor/quest-builder' },
    { icon: Users, label: 'Analytics', path: '/professor/analytics' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const navItems = userRole === 'student' ? studentNav : professorNav;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 backdrop-blur-sm">
      <div className="max-w-md mx-auto px-4 py-2">
        {/* Progress/Points Display */}
        <div className="flex items-center justify-center gap-4 py-2 text-xs">
          <div className="flex items-center gap-1">
            <span>🔥</span>
            <span className="font-medium text-primary">{xp} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💎</span>
            <span className="font-medium text-primary">{coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⭐️</span>
            <span className="font-medium text-primary">Level {level}</span>
          </div>
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center justify-between">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={getButtonClass(item.path)}>
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
              <div className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">Alerts</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;