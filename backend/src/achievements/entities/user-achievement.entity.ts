import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Achievements } from './achievements.entity';

@Entity()
export class UserAchievements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  progress: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.achievements)
  user: User;

  @ManyToOne(() => Achievements, (achievement) => achievement.userAchievement)
  achievement: Achievements;
}
