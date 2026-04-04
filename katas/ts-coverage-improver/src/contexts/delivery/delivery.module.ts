import { Module } from '@nestjs/common';
import { DeliveryApplicationService } from './application/delivery.application.service';
import { DeliveryController } from './interface/delivery.controller';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryApplicationService],
  exports: [DeliveryApplicationService],
})
export class DeliveryModule {}
