import { Injectable } from "@nestjs/common";
import { IAuthenticatedUser } from "../../auth/interfaces/authenticated-user.interface";

@Injectable()
export class ReposService {

  constructor() {
  }

  findAll(authenticatedUser: IAuthenticatedUser): Promise<any> {
    return new Promise<any>(async (resolve, rejects) => {
      resolve(`This action returns all repos`);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} repo`;
  }
}
