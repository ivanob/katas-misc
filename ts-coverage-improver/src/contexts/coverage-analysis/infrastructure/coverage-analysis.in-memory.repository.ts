export class CoverageAnalysisInMemoryRepository {
  private readonly snapshots: string[] = [];

  save(snapshot: string): void {
    this.snapshots.push(snapshot);
  }

  all(): string[] {
    return [...this.snapshots];
  }
}
