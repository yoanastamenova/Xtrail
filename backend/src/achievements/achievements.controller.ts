import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  //Get all achievements
  @Get('all')
  findAll() {
    return this.achievementsService.findAchievements();
  }

  //Get user's achievements
  @Get('user')
  findUserAchievements(@CurrentUser('sub') userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  //Get achievement by ID
  @Get(':id')
  findAchievement(@Param('id') id: number) {
    return this.achievementsService.findAchievement(id);
  }

  // Delete achievement by ID (Admin)
  @Delete(':id')
  deleteAchievement(@Param('id') id: number) {
    return this.achievementsService.deleteAchievement(id);
  }
}
