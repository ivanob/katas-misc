import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  getCoverageAnalysisStatus(
    @Param('repoId') repoId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.applicationService.getAnalysisStatus(repoId, jobId);
  }

}
