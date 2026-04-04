import { Controller, Get } from '@nestjs/common';
import { DeliveryApplicationService } from '../application/delivery.application.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryApplicationService: DeliveryApplicationService) {}

  @Get('status')
  getStatus(): string {
    return this.deliveryApplicationService.getStatus();
  }
}
