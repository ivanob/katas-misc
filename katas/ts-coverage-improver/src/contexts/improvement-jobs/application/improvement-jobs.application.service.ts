import { Injectable } from '@nestjs/common';
import { ImprovementJobsDomainService } from '../domain/improvement-jobs.domain-service';

@Injectable()
export class ImprovementJobsApplicationService {
  private readonly domainService = new ImprovementJobsDomainService();

  getStatus(): string {
    return `${this.domainService.describeContext()} ready`;
  }
}
