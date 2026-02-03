import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievments } from './entities/achievments.entity';
import { UserAchievments } from './entities/user-achievment.entity';
import { AchievmentsService } from './achievments.service';
import { AchievmentsController } from './achievments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Achievments, UserAchievments])],
  controllers: [AchievmentsController],
  providers: [AchievmentsService],
})
export class AchievmentsModule {}
