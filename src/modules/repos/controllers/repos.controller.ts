import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ReposService } from "../services/repos.service";
import { AuthenticatedUser } from "../../auth/decorators/authenticated-user.decorator";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";

@Controller("repos")
@UseGuards(AuthenticatedGuard)
export class ReposController {
  constructor(private readonly reposService: ReposService) {
  }


  @Get()
  findAll(@AuthenticatedUser() user: IAuthenticatedUser) {
    return this.reposService.findAll(user);
  }

  @Get(":repoId")
  findOne(@AuthenticatedUser() user: IAuthenticatedUser, @Param("repoId") repoId: string) {
    return this.reposService.findOne(+repoId);
  }
}
