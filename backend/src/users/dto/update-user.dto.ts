import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UserGoal } from '../entities/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUser {
  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiPropertyOptional({ example: 170 })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiPropertyOptional({ enum: UserGoal, example: 'HEALTHY' })
  @IsOptional()
  @IsEnum(UserGoal)
  goal: UserGoal;
}
