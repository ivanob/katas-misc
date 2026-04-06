import { Module } from '@nestjs/common';
import { GithubApplicationService } from './application/application.service';

@Module({
  controllers: [],
  providers: [GithubApplicationService],
  exports: [GithubApplicationService],
})
export class GithubModule {}
