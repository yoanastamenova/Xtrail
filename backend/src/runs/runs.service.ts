import { InjectRepository } from '@nestjs/typeorm';
import { Run } from './entities/run.entity';
import { Repository } from 'typeorm';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RunsService {
  constructor(
    @InjectRepository(Run)
    private runRepository: Repository<Run>,
  ) {}

  //1. POST new run

  async createRun(createRunDto: CreateRunDto, userId: number) {
    const run = this.runRepository.create({
      ...createRunDto,
      user: { id: userId },
    });
    return this.runRepository.save(run);
  }

  //2. GET runs (User)
  async findRuns(userId: number): Promise<Run[]> {
    return this.runRepository.find({
      where: { user: { id: userId } },
      order: {
        id: 'ASC',
      },
    });
  }

  //3. GET runs/:id (Specific run details)
  async findRun(id: number) {
    const run = await this.runRepository.findOneBy({ id });

    if (!run) {
      throw new NotFoundException('Run with this ID does not exist!');
    }

    return run;
  }

  //4. PATCH runs/:id
  async updateRun(id: number, updateRun: UpdateRunDto, userId: number) {
    const run = await this.runRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!run) {
      throw new NotFoundException('Run with this ID does not exist!');
    }

    if (run.user.id !== userId) {
      throw new ForbiddenException('This run belongs to another user');
    }

    return this.runRepository.update(id, updateRun);
  }

  //5. DELETE runs/:id

  async deleteRun(id: number, userId: number) {
    const run = await this.runRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!run) {
      throw new NotFoundException('Run with this ID does not exist!');
    }

    if (run?.user.id !== userId) {
      throw new ForbiddenException('This run belongs to another user');
    }

    return this.runRepository.delete(id);
  }
}
