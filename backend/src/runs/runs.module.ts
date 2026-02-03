import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Run } from './entities/run.entity';
import { RunsService } from './runs.service';
import { RunsController } from './runs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Run])],
  controllers: [RunsController],
  providers: [RunsService],
})
export class RunsModule {}
