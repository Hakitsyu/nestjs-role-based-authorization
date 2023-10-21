import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/user/core/domain/enumerators/user-role.enum';
import { RequestAuthenticatedUserProvider } from '../services/request/request-authenticated-user-provider.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
        private readonly requestAuthenticatedUserProvider: RequestAuthenticatedUserProvider) {  }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<UserRole[] | undefined>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (roles === undefined || roles.length <= 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();    
        const user = this.requestAuthenticatedUserProvider.get(request);
        if (!user || !roles.includes(user.role)) {
            throw new UnauthorizedException();
        }    

        return true;
    }
}