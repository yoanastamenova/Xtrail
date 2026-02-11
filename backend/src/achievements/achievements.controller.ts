import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('all')
  findAll() {
    return this.achievementsService.findAchievements();
  }

  @Get('/user/:userId')
  findUserAchievements(@Param('userId') userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  @Get('/:id')
  findAchievement(@Param('id') id: number) {
    return this.achievementsService.findAchievement(id);
  }

  @Delete('/:id')
  deleteAchievement(@Param('id') id: number) {
    return this.achievementsService.deleteAchievement(id);
  }
}
