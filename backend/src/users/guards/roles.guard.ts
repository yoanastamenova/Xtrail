import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users.service';
import { Roles } from '../decorators/roles.decorator';

interface JwtPayload {
  sub: number;
  email: string;
}

interface RequestWithUser {
  user: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get(Roles, context.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.sub;
    const user = await this.userService.findById(userId);

    return requiredRoles.includes(user.role);
  }
}
