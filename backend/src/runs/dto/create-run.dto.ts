import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ example: 5.25, description: 'Distance in kilometers' })
  @IsNumber()
  distance: number;

  @ApiProperty({
    example: 560,
    description: 'Pace in seconds per km (9:20/km = 560)',
  })
  @IsNumber()
  pace: number;

  @ApiProperty({ example: 320, description: 'Calories burned' })
  @IsNumber()
  calories: number;

  @ApiProperty({
    example: 1590,
    description: 'Duration in seconds (26:30 = 1590)',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 45, description: 'Elevation gain in meters' })
  @IsNumber()
  elevation: number;
}
