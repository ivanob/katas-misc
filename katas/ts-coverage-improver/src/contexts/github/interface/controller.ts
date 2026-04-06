import { Controller, Get } from '@nestjs/common';
import { GithubApplicationService } from '../application/application.service';

@Controller('github')
export class GithubController {
  constructor(private readonly applicationService: GithubApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.applicationService.getStatus();
  }
}
