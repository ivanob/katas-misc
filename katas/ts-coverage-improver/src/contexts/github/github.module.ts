import { Module } from '@nestjs/common';
import { GithubApplicationService } from './application/application.service';
import { GithubController } from './interface/github.controller';

@Module({
  controllers: [GithubController],
  providers: [GithubApplicationService],
  exports: [GithubApplicationService],
})
export class GithubModule {}
