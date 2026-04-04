import { Controller, Get } from '@nestjs/common';
import { CoverageAnalysisApplicationService } from '../application/coverage-analysis.application.service';

@Controller('coverage-analysis')
export class CoverageAnalysisController {
  constructor(
    private readonly coverageAnalysisApplicationService: CoverageAnalysisApplicationService,
  ) {}

  @Get('status')
  getStatus(): string {
    return this.coverageAnalysisApplicationService.getStatus();
  }
}
