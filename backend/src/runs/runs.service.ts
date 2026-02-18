import { InjectRepository } from '@nestjs/typeorm';
import { Run } from './entities/run.entity';
import { Repository } from 'typeorm';
import { CreateRunDto } from './dto/create-run.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AchievementsService } from 'src/achievements/achievements.service';

export interface RunStats {
  totalRuns: number;
  totalDistance: number;
  totalDuration: number;
  totalElevation: number;
  averageDistance: number;
  longestRun: number;
}

@Injectable()
export class RunsService {
  constructor(
    @InjectRepository(Run)
    private runRepository: Repository<Run>,
    private achievementsService: AchievementsService,
  ) {}

  //1. POST new run
  async createRun(createRunDto: CreateRunDto, userId: number) {
    const run = this.runRepository.create({
      ...createRunDto,
      user: { id: userId },
    });
    const savedRun = await this.runRepository.save(run);

    await this.checkAchievements(userId, savedRun);

    return savedRun;
  }

  // Private method to check and unlock achievements
  private async checkAchievements(userId: number, run: Run) {
    const stats = await this.getRunStats(userId);

    const milestones = [
      { threshold: 1, achievementId: 1 }, // First run
      { threshold: 5, achievementId: 2 }, // 5 runs
      { threshold: 10, achievementId: 3 }, // 10 runs
      { threshold: 25, achievementId: 4 }, // 25 runs
      { threshold: 50, achievementId: 5 }, // 50 runs
    ];

    for (const milestone of milestones) {
      if (stats.totalRuns >= milestone.threshold) {
        await this.achievementsService.unlockAchievement(
          userId,
          milestone.achievementId,
        );
      }
    }

    if (run.distance >= 10) {
      await this.achievementsService.unlockAchievement(userId, 6); // 10km run
    }

    if (stats.totalDistance >= 100) {
      await this.achievementsService.unlockAchievement(userId, 7); // 100km total
    }
  }

  //2. GET runs (User)
  async findRuns(userId: number): Promise<Run[]> {
    const runs = await this.runRepository.find({
      where: { user: { id: userId } },
      order: {
        id: 'ASC',
      },
    });

    if (runs.length === 0) {
      throw new NotFoundException('You have no runs to show');
    }

    return runs;
  }

  //3. GET runs/:id (Specific run details)
  async findRun(id: number, userId: number, isAdmin: boolean) {
    const run = await this.runRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${id} does not exist`);
    }

    if (run.user.id !== userId && !isAdmin) {
      throw new ForbiddenException('You dont have permision to view this run');
    }

    return run;
  }

  //4. GET Runs Stats (for User)
  async getRunStats(userId: number): Promise<RunStats> {
    const stats = await this.runRepository
      .createQueryBuilder('run')
      .select('COUNT(*)', 'totalRuns')
      .addSelect('COALESCE(SUM(run.distance), 0)', 'totalDistance')
      .addSelect('COALESCE(SUM(run.duration), 0)', 'totalDuration')
      .addSelect('COALESCE(SUM(run.elevation), 0)', 'totalElevation')
      .addSelect('COALESCE(AVG(run.distance), 0)', 'averageDistance')
      .addSelect('COALESCE(MAX(run.distance), 0)', 'longestRun')
      .where('run.userId = :userId', { userId })
      .getRawOne<RunStats>();

    return stats as RunStats;
  }

  //5. DELETE runs/:id
  async deleteRun(id: number, userId: number) {
    const run = await this.runRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${id} does not exist`);
    }

    if (run.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this run',
      );
    }

    await this.runRepository.delete(id);
    return { message: `Run ${id} deleted successfully` };
  }
}
