import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Achievements')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  //Get all achievements
  @Get('all')
  findAll() {
    return this.achievementsService.findAchievements();
  }

  //Get current user's achievements
  @Get('user')
  findUserAchievements(@CurrentUser('sub') userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  //Get any user's achievements (Admin only)
  @Get('user/:userId')
  @Roles([UserRole.admin])
  findUserAchievementsByAdmin(@Param('userId') userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  //Get user achievement by ID
  @Get(':id')
  async findUserAchievement(
    @Param('id') id: number,
    @CurrentUser('sub') userId: number,
  ): Promise<any> {
    return await this.achievementsService.findUserAchievement(id, userId);
  }

  // Delete achievement by ID (Admin)
  @Delete(':id')
  @Roles([UserRole.admin])
  deleteAchievement(@Param('id') id: number) {
    return this.achievementsService.deleteAchievement(id);
  }
}
