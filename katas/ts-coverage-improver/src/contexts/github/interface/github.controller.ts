import { Controller, Get } from '@nestjs/common';
import { GithubApplicationService } from '../application/application.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubApplicationService: GithubApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.githubApplicationService.getStatus();
  }
}
