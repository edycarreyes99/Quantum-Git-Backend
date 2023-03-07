import { Injectable } from "@nestjs/common";

@Injectable()
export class ReposService {
  findAll() {
    return `This action returns all repos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repo`;
  }
}
