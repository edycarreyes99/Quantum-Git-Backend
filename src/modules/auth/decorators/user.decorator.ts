import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  request.user.github_access_token = request.headers.secondary_authorization
  return request.user;
});
