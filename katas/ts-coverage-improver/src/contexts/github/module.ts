import { Module } from '@nestjs/common';
import { ApplicationService } from './application/application.service';
import { Controller } from './interface/controller';

@Module({
  controllers: [Controller],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class GithubModule {}
