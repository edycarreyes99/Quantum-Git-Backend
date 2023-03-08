import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { ReposModule } from "./modules/repos/repos.module";
import { BranchesModule } from "./modules/branches/branches.module";
import { UsersModule } from "./modules/users/users.module";
import { CommitsModule } from "./modules/commits/commits.module";

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: "firebase-jwt" }),
    ReposModule,
    BranchesModule,
    UsersModule,
    CommitsModule,
  ],
  controllers: [],
  exports: [PassportModule],
  providers: [],
})
export class AppModule {
}
