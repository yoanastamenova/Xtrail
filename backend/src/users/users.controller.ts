import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUser } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @Roles([UserRole.admin])
  findAll() {
    return this.usersService.findAll();
  }

  // Get my account by email
  @Get('email')
  findByEmail(@CurrentUser('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Get my account
  @Get('me')
  findCurrentUser(@CurrentUser('sub') id: number) {
    return this.usersService.findById(id);
  }

  // Get by ID (admin)
  @Get(':id')
  @Roles([UserRole.admin])
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  // Update my account
  @Patch('me')
  updateCurrentUser(
    @CurrentUser('sub') id: number,
    @Body() updateUser: UpdateUser,
  ) {
    return this.usersService.updateUser(id, updateUser);
  }

  // Delete my account
  @Delete('me')
  deleteCurrentUser(@CurrentUser('sub') id: number) {
    return this.usersService.deleteUser(id);
  }

  // DELETE (Admin)
  @Delete(':id')
  @Roles([UserRole.admin])
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
