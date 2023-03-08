import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-firebase-jwt";
import { DecodedIdToken } from "firebase-admin/lib/auth";
import { firebase } from "../../../core/utils/firebase";
import { Request } from "express";
import { Octokit } from "octokit";

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
    let octokit: Octokit | undefined;
    const gitHubAccessToken: string | string[] | undefined = request?.headers["secondary_authorization"];
    let githubUser;
    if (gitHubAccessToken) {
      octokit = new Octokit({
        auth: gitHubAccessToken,
      });

      githubUser = await octokit.rest.users.getAuthenticated()
        .catch((error) => {
          throw new UnauthorizedException(error.message);
        });
    }

    const firebaseUser: DecodedIdToken = await firebase.auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser || !githubUser) {
      throw new UnauthorizedException();
    }

    return { ...firebaseUser, github_user: githubUser.data };
  }
}
