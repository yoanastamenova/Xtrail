import { UserAchievements } from 'src/achievements/entities/user-achievement.entity';
import { Run } from '../../runs/entities/run.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserGoal {
  GAIN = 'GAIN',
  LOSE = 'LOSE',
  HEALTHY = 'HEALTHY',
}

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ unique: true })
  username: string;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @Column({
    type: 'enum',
    enum: UserGoal,
    default: UserGoal.HEALTHY,
  })
  goal: UserGoal;

  @OneToMany(() => Run, (run) => run.user)
  runs: Run[];

  @OneToMany(() => UserAchievements, (achievement) => achievement.user)
  achievements: UserAchievements[];

  @CreateDateColumn()
  createdAt: Date;
}
