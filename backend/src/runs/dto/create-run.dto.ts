import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateRunDto {
  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  elevation: number;

  @Type(() => Date)
  date: Date;
}
