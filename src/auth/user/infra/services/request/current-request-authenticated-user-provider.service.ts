import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CurrentRequestJwtPayloadProvider } from 'src/auth/jwt/services/request/current-request-jwt-payload-provider.service';
import { RequestJwtPayloadService } from 'src/auth/jwt/services/request/request-jwt-payload.service';
import { UserService } from 'src/user/core/application/services/user.service';
import { User } from 'src/user/core/domain/entities/user.entity';
import { SignPayload } from '../../dtos/sign.dto';

export abstract class CurrentRequestAuthenticatedUserProvider {
    abstract get(): User    
}

@Injectable({ scope: Scope.REQUEST })
export class DefaultCurrentRequestAuthenticatedUserProvider implements CurrentRequestAuthenticatedUserProvider {
    constructor(private readonly userService: UserService,
        private readonly currentRequestJwtPayloadProvider: CurrentRequestJwtPayloadProvider) { }

    get(): User {
        const payload = this.currentRequestJwtPayloadProvider.get() as SignPayload;
        return this.userService.findByEmail(payload.email);
    }
}
