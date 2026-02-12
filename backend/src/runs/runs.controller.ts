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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  // Create a run for the current user
  @Post()
  createRun(
    @CurrentUser('sub') userId: number,
    @Body() createRunDto: CreateRunDto,
  ) {
    return this.runsService.createRun(createRunDto, userId);
  }

  // Get all runs for the current user
  @Get()
  findRuns(@CurrentUser('sub') userId: number) {
    return this.runsService.findRuns(userId);
  }

  // Get a specific run by ID
  @Get(':id')
  findRun(@Param('id') id: number) {
    return this.runsService.findRun(id);
  }

  // Update run for the current user by ID
  @Patch(':id')
  updateRun(
    @CurrentUser('sub') userId: number,
    @Param('id') runId: number,
    @Body() updateRun: UpdateRunDto,
  ) {
    return this.runsService.updateRun(runId, updateRun, userId);
  }

  // Get stats for the current user
  @Get('stats')
  getRunStats(@CurrentUser('sub') userId: number): Promise<RunStats> {
    return this.runsService.getRunStats(userId);
  }

  // Delete run for the current user by runs ID (userId for ownership check)
  @Delete(':id')
  deleteRun(@CurrentUser('sub') userId: number, @Param('id') id: number) {
    return this.runsService.deleteRun(id, userId);
  }
}
