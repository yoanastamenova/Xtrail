import { UserAchievements } from 'src/achievements/entities/user-achievement.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievements } from './entities/achievements.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievements)
    private achievementsRepository: Repository<Achievements>,
    @InjectRepository(UserAchievements)
    private userAchievementsRepository: Repository<UserAchievements>,
  ) {}

  //1. GET all achievement
  async findAchievements(): Promise<Achievements[]> {
    return this.achievementsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  //2. GET achievement by ID
  async findAchievement(id: number) {
    const achievement = await this.achievementsRepository.findOneBy({ id });

    if (!achievement) {
      throw new NotFoundException('Achievement with this ID does not exist!');
    }

    return achievement;
  }

  //3. GET User achievements
  async getUserAchievements(userId: number) {
    const achievements = await this.userAchievementsRepository.find({
      where: { user: { id: userId } },
      relations: ['achievement'],
    });

    if (achievements.length === 0) {
      throw new NotFoundException('This user has no achievements to show!');
    }

    return achievements;
  }

  //4. DELETE achievement by ID
  async deleteAchievement(id: number) {
    const achievement = await this.achievementsRepository.findOneBy({ id });

    if (!achievement) {
      throw new NotFoundException('Achievement with this ID does not exist!');
    }

    return this.achievementsRepository.delete(id);
  }

  //5. Unlock an achievement
  async unlockAchievement(
    userId: number,
    achievementId: number,
  ): Promise<UserAchievements> {
    const achievement = await this.achievementsRepository.findOneBy({
      id: achievementId,
    });

    if (!achievement) {
      throw new NotFoundException('Achievement not found');
    }

    const existing = await this.userAchievementsRepository.findOne({
      where: {
        user: { id: userId },
        achievement: { id: achievementId },
      },
    });

    if (existing) {
      return existing;
    }

    const userAchievement = this.userAchievementsRepository.create({
      user: { id: userId },
      achievement: { id: achievementId },
      progress: 100,
      dateEarned: new Date(),
    });

    return this.userAchievementsRepository.save(userAchievement);
  }
}
