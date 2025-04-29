import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const user = request.user;

    return data ? user![data] : user;
  },
);
