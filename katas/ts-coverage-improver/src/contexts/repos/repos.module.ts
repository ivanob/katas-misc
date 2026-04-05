import { Module } from '@nestjs/common';
import { ReposApplicationService } from './application/repos.application.service';
import { ReposController } from './interface/repos.controller';

@Module({
  controllers: [ReposController],
  providers: [ReposApplicationService],
  exports: [ReposApplicationService],
})
export class ReposModule {}
