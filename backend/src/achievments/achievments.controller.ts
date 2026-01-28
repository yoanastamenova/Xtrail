import { Controller } from '@nestjs/common';
import { AchievmentsService } from './achievments.service';

@Controller('achievments')
export class AchievmentsController {
  constructor(private readonly achievmentsService: AchievmentsService) {}
}
