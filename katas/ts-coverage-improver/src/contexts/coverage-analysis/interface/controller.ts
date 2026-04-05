import { Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';

@Controller('repos')
export class Controller {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Post('analyze')
  runCoverageAnalysis() {}

  @Get(':repoId/analyze/:jobId')
  getCoverageAnalysisStatus() {}

}
