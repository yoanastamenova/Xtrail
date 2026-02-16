import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAchievementDto {
  @ApiProperty({ example: 'First Run' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Completed a first running exercise' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'smiley' })
  @IsString()
  icon: string;
}
