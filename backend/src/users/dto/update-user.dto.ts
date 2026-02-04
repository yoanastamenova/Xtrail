import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserGoal } from '../entities/user.entity';

export class UpdateUser {
  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsEnum(UserGoal)
  goal: UserGoal;
}
