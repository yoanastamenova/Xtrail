import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum UserGoal {
  GAIN = 'gain',
  LOSE = 'lose',
  HEALTHY = 'healthy',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

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

  @CreateDateColumn()
  createdAt: Date;
}
