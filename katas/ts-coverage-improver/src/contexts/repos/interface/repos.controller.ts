import { Controller, Get } from '@nestjs/common';
import { ReposApplicationService } from '../application/repos.application.service';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposApplicationService: ReposApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.reposApplicationService.getStatus();
  }
}
