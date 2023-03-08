import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { ReposModule } from "./modules/repos/repos.module";
import { BranchesModule } from './modules/branches/branches.module';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: "firebase-jwt" }),
    ReposModule,
    BranchesModule,
  ],
  controllers: [AppController],
  exports: [PassportModule],
  providers: [AppService],
})
export class AppModule {
}
