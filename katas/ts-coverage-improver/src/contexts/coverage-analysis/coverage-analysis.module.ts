import { Module } from '@nestjs/common';
import { CoverageAnalysisApplicationService } from './application/coverage-analysis.application.service';
import { CoverageAnalysisController } from './interface/coverage-analysis.controller';

@Module({
  controllers: [CoverageAnalysisController],
  providers: [CoverageAnalysisApplicationService],
  exports: [CoverageAnalysisApplicationService],
})
export class CoverageAnalysisModule {}
