import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Achievments } from './achievments.entity';

@Entity()
export class UserAchievments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  progress: string;

  @Column()
  dateEarned: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.achievments)
  user: User;

  @ManyToOne(() => Achievments, (achievment) => achievment.userAchievment)
  achievment: Achievments;
}
