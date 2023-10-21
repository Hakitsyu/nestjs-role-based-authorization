import { User } from 'src/user/core/domain/entities/user.entity';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Injectable } from '@nestjs/common';
import { RequestJwtPayloadService } from 'src/auth/jwt/services/request/request-jwt-payload.service';
import { SignPayload } from '../../dtos/sign.dto';
import { UserService } from 'src/user/core/application/services/user.service';

export abstract class RequestAuthenticatedUserProvider {
    abstract get(request: Request): User
}

@Injectable()
export default class DefaultRequestAuthenticatedUserProvider implements RequestAuthenticatedUserProvider {
    constructor(private readonly userService: UserService,
        private readonly requestJwtPayloadService: RequestJwtPayloadService) { }

    get(request: Request): User {
        const payload = this.requestJwtPayloadService.get(request) as SignPayload;
        return this.userService.findByEmail(payload.email);;
    }
}