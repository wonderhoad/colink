import { ArrowLeft, Gamepad2, Trophy, Zap, Timer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ColorGame = () => {
  const [gameMode, setGameMode] = useState<"menu" | "playing" | "results">("menu");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [gameType, setGameType] = useState<"memory" | "speed" | "pattern">("memory");

  // Game stats
  const playerStats = {
    bestScore: 1250,
    gamesPlayed: 47,
    accuracy: 85,
    bonusXP: 150
  };

  // Colors for the game (Coventry Blue variations and white)
  const gameColors = [
    "bg-primary",
    "bg-primary-hover", 
    "bg-primary-light",
    "bg-white border-2 border-primary"
  ];

  const startGame = (type: "memory" | "speed" | "pattern") => {
    setGameType(type);
    setGameMode("playing");
    setScore(0);
    setLevel(1);
    setTimeLeft(type === "speed" ? 30 : 60);
    generateSequence();
  };

  const generateSequence = () => {
    const length = Math.min(3 + level, 8);
    const sequence = Array.from({ length }, () => 
      gameColors[Math.floor(Math.random() * gameColors.length)]
    );
    setCurrentSequence(sequence);
    setPlayerSequence([]);
    setShowSequence(true);
    
    setTimeout(() => setShowSequence(false), 1000 + (length * 600));
  };

  const handleColorClick = (color: string) => {
    if (showSequence) return;
    
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence.length === currentSequence.length) {
      if (JSON.stringify(newPlayerSequence) === JSON.stringify(currentSequence)) {
        setScore(prev => prev + (10 * level));
        setLevel(prev => prev + 1);
        setTimeout(() => generateSequence(), 1000);
      } else {
        setGameMode("results");
      }
    }
  };

  useEffect(() => {
    if (gameMode === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameMode("results");
    }
  }, [timeLeft, gameMode]);

  if (gameMode === "menu") {
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
                Color Challenge Game 🎮
              </h1>
              <p className="text-muted-foreground">Test your memory and earn bonus XP!</p>
            </div>
          </div>

          {/* Player Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{playerStats.bestScore}</div>
                <p className="text-sm text-muted-foreground">Best Score</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <Gamepad2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{playerStats.gamesPlayed}</div>
                <p className="text-sm text-muted-foreground">Games Played</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{playerStats.accuracy}%</div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{playerStats.bonusXP}</div>
                <p className="text-sm text-muted-foreground">Bonus XP</p>
              </CardContent>
            </Card>
          </div>

          {/* Game Modes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => startGame("memory")}>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Memory Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Remember the sequence of blue and white colors, then repeat it back!
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Rewards:</div>
                  <div className="text-primary font-semibold">50-200 XP based on level</div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Start Memory Game
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => startGame("speed")}>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Timer className="h-6 w-6 text-primary" />
                  Speed Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Match as many blue patterns as possible within the time limit!
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Rewards:</div>
                  <div className="text-primary font-semibold">100-300 XP based on score</div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Start Speed Game
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => startGame("pattern")}>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Pattern Quest
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Find and complete the hidden Coventry University patterns!
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Rewards:</div>
                  <div className="text-primary font-semibold">75-250 XP + Special Badge</div>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Start Pattern Quest
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === "playing") {
    return (
      <div className="min-h-screen bg-gradient-secondary p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {gameType === "memory" ? "Memory Challenge" : gameType === "speed" ? "Speed Challenge" : "Pattern Quest"}
            </h2>
            <div className="flex justify-center gap-6 text-sm">
              <div>Score: <span className="font-bold text-primary">{score}</span></div>
              <div>Level: <span className="font-bold text-primary">{level}</span></div>
              <div>Time: <span className="font-bold text-primary">{timeLeft}s</span></div>
            </div>
          </div>

          {/* Game Area */}
          <Card className="shadow-primary">
            <CardContent className="p-8">
              {showSequence && (
                <div className="text-center mb-6">
                  <p className="text-lg font-semibold text-primary">Remember this sequence:</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {gameColors.map((color, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${color} 
                              ${showSequence && currentSequence.includes(color) ? 'animate-pulse-primary' : ''}
                              ${!showSequence ? 'hover:shadow-lg' : 'pointer-events-none'}`}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>

              {!showSequence && (
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Click the colors in the correct sequence!
                  </p>
                  <Progress value={(playerSequence.length / currentSequence.length) * 100} className="mt-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => setGameMode("menu")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quit Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-primary text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Game Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary">{score}</div>
                <p className="text-muted-foreground">Final Score</p>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-primary">{score * 2} XP</div>
                <p className="text-muted-foreground">Bonus XP Earned</p>
              </div>

              <div>
                <div className="text-xl font-bold text-primary">Level {level}</div>
                <p className="text-muted-foreground">Reached</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => startGame(gameType)} className="bg-gradient-primary hover:opacity-90">
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button variant="outline" onClick={() => setGameMode("menu")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorGame;