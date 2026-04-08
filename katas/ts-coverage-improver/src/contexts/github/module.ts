import { Module } from '@nestjs/common';
import { GithubApplicationService } from './application/application.service';
import { GithubApiClient } from './infraestructure/github-api.client';
import { GithubConfigService } from './infraestructure/github-config';

@Module({
  controllers: [],
  providers: [
    GithubApplicationService,
    GithubApiClient,
    GithubConfigService,
  ],
  exports: [GithubApplicationService],
})
export class GithubModule {}
