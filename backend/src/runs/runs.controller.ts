import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { RunStats } from './runs.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post('new/:id')
  createRun(@Param('id') id: number, @Body() createRunDto: CreateRunDto) {
    return this.runsService.createRun(createRunDto, id);
  }

  @Get('runs/:id')
  findRuns(@Param('id') id: number) {
    return this.runsService.findRuns(id);
  }

  @Get('run/:id')
  findRun(@Param('id') id: number) {
    return this.runsService.findRun(id);
  }

  @Patch(':userId/run/:id')
  updateRun(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() updateRun: UpdateRunDto,
  ) {
    return this.runsService.updateRun(id, updateRun, userId);
  }

  @Get('run/stats/:id')
  getRunStats(@Param('id') id: number): Promise<RunStats> {
    return this.runsService.getRunStats(id);
  }

  @Delete('delete/:userId/:id')
  deleteRun(@Param('id') id: number, @Param('userId') userId: number) {
    return this.runsService.deleteRun(id, userId);
  }
}
