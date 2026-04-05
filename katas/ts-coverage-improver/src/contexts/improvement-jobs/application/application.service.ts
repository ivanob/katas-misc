import { Injectable } from '@nestjs/common';
import { DomainService } from '../domain/domain-service';

@Injectable()
export class ApplicationService {
  private readonly domainService = new DomainService();

  getStatus(): string {
    return 'Improvement jobs service ready';
  }

  runImprovement() { }
  
  getImprovementStatus() { }
}
