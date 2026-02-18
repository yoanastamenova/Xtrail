import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { RunStats } from './runs.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Runs')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  // Create a run for the current user
  @Post('new')
  createRun(
    @CurrentUser('sub') userId: number,
    @Body() createRunDto: CreateRunDto,
  ) {
    return this.runsService.createRun(createRunDto, userId);
  }

  // Get all runs for the current user
  @Get('all')
  findRuns(@CurrentUser('sub') userId: number) {
    return this.runsService.findRuns(userId);
  }

  // Get stats for the current user
  @Get('stats')
  getRunStats(@CurrentUser('sub') userId: number): Promise<RunStats> {
    return this.runsService.getRunStats(userId);
  }

  // Get a specific run by ID (owner or admin only)
  @Get(':id')
  findRun(
    @Param('id') id: number,
    @CurrentUser('sub') userId: number,
    @CurrentUser('role') role: string,
  ) {
    return this.runsService.findRun(id, userId, role === 'admin');
  }

  // Delete run (owner or admin only)
  @Delete(':id')
  deleteRun(
    @Param('id') runId: number,
    @CurrentUser('sub') userId: number,
    @CurrentUser('role') role: string,
  ) {
    return this.runsService.deleteRun(runId, userId, role === 'admin');
  }
}
