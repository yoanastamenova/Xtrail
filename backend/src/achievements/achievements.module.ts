import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { UserAchievements } from './entities/user-achievement.entity';
import { Achievements } from './entities/achievements.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achievements, UserAchievements])],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
