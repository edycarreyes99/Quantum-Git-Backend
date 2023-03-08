import { Module } from "@nestjs/common";
import { CommitsService } from "./services/commits.service";
import { CommitsController } from "./controllers/commits.controller";

@Module({
  controllers: [CommitsController],
  providers: [CommitsService],
})
export class CommitsModule {
}
