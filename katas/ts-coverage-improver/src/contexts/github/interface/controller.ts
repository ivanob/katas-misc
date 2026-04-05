import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';

@Controller('github')
export class Controller {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.applicationService.getStatus();
  }
}
