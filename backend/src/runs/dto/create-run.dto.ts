import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ example: 5.25, description: 'Distance in kilometers' })
  @IsNumber()
  @Min(10)
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
  @Min(2)
  duration: number;

  @ApiProperty({ example: 45, description: 'Elevation gain in meters' })
  @IsNumber()
  elevation: number;
}
