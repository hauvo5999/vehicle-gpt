import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../jwt.service';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new Error('User not found in request');
    }
    
    return user;
  },
); 