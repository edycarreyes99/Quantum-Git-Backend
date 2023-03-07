import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ReposService } from "../services/repos.service";

@Controller("repos")
export class ReposController {
  constructor(private readonly reposService: ReposService) {}


  @Get()
  findAll() {
    return this.reposService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reposService.findOne(+id);
  }
}
