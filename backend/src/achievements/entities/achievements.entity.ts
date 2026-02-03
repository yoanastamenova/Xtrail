import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserAchievements } from './user-achievement.entity';

@Entity()
export class Achievements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => UserAchievements,
    (userAchievement) => userAchievement.achievment,
  )
  userAchievment: UserAchievements[];
}
