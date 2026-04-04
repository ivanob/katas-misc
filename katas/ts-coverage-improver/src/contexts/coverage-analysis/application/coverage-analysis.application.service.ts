import { Injectable } from '@nestjs/common';
import { CoverageAnalysisDomainService } from '../domain/coverage-analysis.domain-service';

@Injectable()
export class CoverageAnalysisApplicationService {
  private readonly domainService = new CoverageAnalysisDomainService();

  getStatus(): string {
    return `${this.domainService.describeContext()} ready`;
  }
}
