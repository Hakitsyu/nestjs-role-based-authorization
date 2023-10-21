import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CurrentRequestJwtPayloadProvider } from 'src/auth/jwt/services/request/current-request-jwt-payload-provider.service';
import { RequestJwtPayloadService } from 'src/auth/jwt/services/request/request-jwt-payload.service';
import { UserService } from 'src/user/core/application/services/user.service';
import { User } from 'src/user/core/domain/entities/user.entity';
import { SignPayload } from '../../dtos/sign.dto';
import { Request } from 'express';
import { RequestAuthenticatedUserProvider } from './request-authenticated-user-provider.service';

export abstract class CurrentRequestAuthenticatedUserProvider {
    abstract get(): User    
}

@Injectable({ scope: Scope.REQUEST })
export class DefaultCurrentRequestAuthenticatedUserProvider implements CurrentRequestAuthenticatedUserProvider {
    constructor(@Inject(REQUEST) private readonly request: Request,
        private readonly requestAuthenticatedUserProvider: RequestAuthenticatedUserProvider) { }

    get(): User {
        return this.requestAuthenticatedUserProvider.get(this.request);
    }
}
