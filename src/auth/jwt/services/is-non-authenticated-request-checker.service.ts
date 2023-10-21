import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NON_AUTHENTICATED_KEY } from '../decorators/non-authenticated.decorator';

export abstract class IsNonAuthenticatedRequestChecker {
    abstract check(context: ExecutionContext): boolean;
}

@Injectable()
export class DefaultIsNonAuthenticatedRequestChecker implements IsNonAuthenticatedRequestChecker {
    constructor(private readonly reflector: Reflector) { }

    check(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride<boolean>(NON_AUTHENTICATED_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
}
