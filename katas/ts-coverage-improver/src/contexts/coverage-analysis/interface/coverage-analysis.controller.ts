import { Controller, Get, Post } from '@nestjs/common';
import { CoverageAnalysisApplicationService } from '../application/coverage-analysis.application.service';

@Controller('repos')
export class CoverageAnalysisController {
  constructor(
    private readonly coverageAnalysisApplicationService: CoverageAnalysisApplicationService,
  ) {}

  @Post('analyze')
  runCoverageAnalysis() {}

  @Get(':repoId/analyze/:jobId')
  getCoverageAnalysisStatus() {}

}
