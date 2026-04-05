import { Controller, Get } from '@nestjs/common';
import { GithubReposApplicationService } from '../application/github-repos.application.service';

@Controller('github-repos')
export class GithubReposController {
  constructor(private readonly githubReposApplicationService: GithubReposApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.githubReposApplicationService.getStatus();
  }
}
