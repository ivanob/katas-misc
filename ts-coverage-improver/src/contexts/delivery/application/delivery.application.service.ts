import { Injectable } from '@nestjs/common';
import { DeliveryDomainService } from '../domain/delivery.domain-service';

@Injectable()
export class DeliveryApplicationService {
  private readonly domainService = new DeliveryDomainService();

  getStatus(): string {
    return `${this.domainService.describeContext()} ready`;
  }
}
