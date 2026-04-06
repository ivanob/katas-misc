import { Repo } from "src/contexts/github/domain/repo.aggregate";

export class ProjectStatus {
    constructor(public readonly repo: Repo, public readonly coverage: number){}
}