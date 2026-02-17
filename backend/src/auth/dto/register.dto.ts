import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserGoal } from 'src/users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'yourmail@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 70 })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 170 })
  @IsNumber()
  height: number;

  @ApiPropertyOptional({ enum: UserGoal, example: 'HEALTHY' })
  @IsOptional()
  @IsEnum(UserGoal)
  goal?: UserGoal;
}
