import { Repo } from "../../../contexts/github/domain/repo.aggregate";
import { FileCoverage } from "./file-coverage.entity";

export class RepoCoverage {
  constructor(
    readonly repoId: string,
    readonly repositoryUrl: string,
    readonly averageCoverage: number,
    readonly fileCoverages: FileCoverage[],
  ) {}
}
