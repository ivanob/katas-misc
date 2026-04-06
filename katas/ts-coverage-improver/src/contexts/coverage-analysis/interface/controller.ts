import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { AnalyzeRequestDto } from '../domain/analyze-request.dto';

@Controller('repos')
export class CoverageAnalysisController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Post('analyze')
  runCoverageAnalysis(@Body() dto: AnalyzeRequestDto) {
    return this.applicationService.runAnalysis(dto);
  }

  @Get(':repoId/analyze/:jobId')
  getCoverageAnalysisStatus() {

  }

}
