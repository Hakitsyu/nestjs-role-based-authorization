import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestJwtTokenProvider } from '../services/request/request-jwt-token-provider.service';
import { JwtService } from '@nestjs/jwt';
import { RequestJwtPayloadService } from '../services/request/request-jwt-payload.service';
import { IsNonAuthenticatedRequestChecker } from '../services/is-non-authenticated-request-checker.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly requestJwtTokenProvider: RequestJwtTokenProvider,
        private readonly jwtService: JwtService,
        private readonly requestJwtPayloadService: RequestJwtPayloadService,
        private readonly isNonAuthenticatedRequestChecker: IsNonAuthenticatedRequestChecker) { }

    canActivate(context: ExecutionContext): boolean {
        if (this.isNonAuthenticatedRequestChecker.check(context))
            return true;

        const request = context.switchToHttp().getRequest();
        const token = this.requestJwtTokenProvider.get(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = this.jwtService.verify(token);

            this.requestJwtPayloadService.save(request, payload);
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}