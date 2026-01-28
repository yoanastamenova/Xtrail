import { Module } from '@nestjs/common';
import { AchievmentsService } from './achievments.service';
import { AchievmentsController } from './achievments.controller';

@Module({
  controllers: [AchievmentsController],
  providers: [AchievmentsService],
})
export class AchievmentsModule {}
