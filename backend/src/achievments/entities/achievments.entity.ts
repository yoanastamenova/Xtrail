import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserAchievments } from './user-achievment.entity';

@Entity()
export class Achievments {
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
    () => UserAchievments,
    (userAchievment) => userAchievment.achievment,
  )
  userAchievment: UserAchievments[];
}
