import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserGoal } from '../entities/user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUser {
  @ApiPropertyOptional({ example: 'user@mail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'poweruser' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: '*******' })
  @IsOptional()
  @IsString()
  password: string;

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
