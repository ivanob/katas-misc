import { Injectable } from '@nestjs/common';
import { ReposDomainService } from '../domain/repos.domain-service';

@Injectable()
export class ReposApplicationService {
  private readonly domainService = new ReposDomainService();

  getStatus(): string {
    return `${this.domainService.describeContext()} ready`;
  }
}
