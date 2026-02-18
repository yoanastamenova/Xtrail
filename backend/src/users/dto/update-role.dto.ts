import { IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ enum: UserRole, example: 'admin' })
  @IsEnum(UserRole)
  role: UserRole;
}
