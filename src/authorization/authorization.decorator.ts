import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
}

export const GetUser = createParamDecorator(
  (_: UserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
