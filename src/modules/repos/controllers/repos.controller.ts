import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ReposService } from "../services/repos.service";
import { User } from "../../auth/decorators/user.decorator";
import { AuthenticatedGuard } from "../../auth/guards/authenticated/authenticated.guard";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";

@Controller("repos")
@UseGuards(AuthenticatedGuard)
export class ReposController {
  constructor(private readonly reposService: ReposService) {
  }


  @Get()
  findAll(@User() user: IAuthenticatedUser) {
    return this.reposService.findAll(user);
  }

  @Get(":repoId")
  findOne(@Param("repoId") repoId: string, @User() user: IAuthenticatedUser) {
    return this.reposService.findOne(+repoId);
  }
}
