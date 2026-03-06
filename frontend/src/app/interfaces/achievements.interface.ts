export interface Achievement {
    id: number;
    name: string;
    description: string;
    icon: string;
    createdAt: Date;
  }

export interface UserAchievement {
    id: number;
    progress: number;
    createdAt: Date;
    achievement: Achievement;
  }
