import { Module } from '@nestjs/common';
import { ReposService } from './services/repos.service';
import { ReposController } from './controllers/repos.controller';

@Module({
  controllers: [ReposController],
  providers: [ReposService]
})
export class ReposModule {}
