export enum UserGoal {
    GAIN = 'GAIN',
    LOSE = 'LOSE',
    HEALTHY = 'HEALTHY',
  }

export interface UserInterface {
  email: string;
  username: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  goal: UserGoal;
}
