import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CreateRunDto } from './create-run.dto';

export class UpdateRunDto extends PartialType(CreateRunDto) {
  @IsOptional()
  @IsNumber()
  distance: number;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
  elevation: number;

  @Type(() => Date)
  date: Date;
}
