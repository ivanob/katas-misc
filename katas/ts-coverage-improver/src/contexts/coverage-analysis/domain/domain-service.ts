import { Repo } from "src/contexts/github/domain/repo.aggregate";
import { FileCoverage } from "./file-coverage.aggregator";
import { ProjectStatus } from "./project-status.value-obj";

export class DomainService {
  identifyLowCoverageFiles(files: FileCoverage[], threshold: number): FileCoverage[] {
    return files.filter(f => f.coverage < threshold);
  }
  
  calculateProjectHealth(project: Repo): ProjectStatus {
    // Complex logic about project state
    return new ProjectStatus(project, 0);
  }
}
