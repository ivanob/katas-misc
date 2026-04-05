import { Injectable } from '@nestjs/common';
import { GithubReposDomainService } from '../domain/github-repos.domain-service';

@Injectable()
export class GithubReposApplicationService {
  private readonly domainService = new GithubReposDomainService();

  getStatus(): string {
    return `${this.domainService.describeContext()} ready`;
  }
}
