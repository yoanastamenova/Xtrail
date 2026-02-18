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

  // Distance in kilometers (e.g., 5.25 for 5.25km)
  @Column('decimal', { precision: 6, scale: 2 })
  distance: number;

  // Pace in seconds per km (e.g., 560 for 9'20"/km)
  @Column()
  pace: number;

  @Column()
  calories: number;

  // Duration in seconds (e.g., 1590 for 26:30)
  @Column()
  duration: number;

  // Elevation in meters
  @Column()
  elevation: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.runs)
  user: User;
}
