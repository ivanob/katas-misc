import { Module } from '@nestjs/common';
import { GithubReposApplicationService } from './application/github-repos.application.service';
import { GithubReposController } from './interface/github-repos.controller';

@Module({
  controllers: [GithubReposController],
  providers: [GithubReposApplicationService],
  exports: [GithubReposApplicationService],
})
export class GithubReposModule {}
