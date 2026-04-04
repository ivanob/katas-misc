export class DeliveryInMemoryRepository {
  private readonly deliveries: string[] = [];

  register(deliveryId: string): void {
    this.deliveries.push(deliveryId);
  }

  all(): string[] {
    return [...this.deliveries];
  }
}
