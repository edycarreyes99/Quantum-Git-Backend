import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-firebase-jwt";
import { DecodedIdToken } from "firebase-admin/lib/auth";
import { firebase } from "../../../core/utils/firebase";
import { Request } from "express";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  "firebase-jwt",
) {
  private logger: Logger = new Logger(this.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string) {
    const gitHubAccessToken: string | string[] | undefined = request?.headers["secondary_authorization"];
    const firebaseUser: DecodedIdToken = await firebase.auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser || !gitHubAccessToken) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}
