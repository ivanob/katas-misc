import { Controller, Get } from '@nestjs/common';
import { ImprovementJobsApplicationService } from '../application/improvement-jobs.application.service';

@Controller('improvement-jobs')
export class ImprovementJobsController {
  constructor(
    private readonly improvementJobsApplicationService: ImprovementJobsApplicationService,
  ) {}

  @Get('status')
  getStatus(): string {
    return this.improvementJobsApplicationService.getStatus();
  }
}
