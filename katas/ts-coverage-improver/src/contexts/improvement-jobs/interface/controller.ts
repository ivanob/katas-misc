import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';

@Controller('improvement-jobs')
export class Controller {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.applicationService.getStatus();
  }
}
