import { User } from '../../users/entities/user.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Run {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column()
  elevation: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.runs)
  user: User;
}
