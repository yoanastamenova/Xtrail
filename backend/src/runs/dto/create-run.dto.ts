import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ example: 500 })
  @IsNumber()
  distance: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  pace: number;

  @ApiProperty({ example: 126 })
  @IsNumber()
  calories: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  elevation: number;

  @Type(() => Date)
  date: Date;
}
