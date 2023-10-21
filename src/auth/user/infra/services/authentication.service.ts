import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationRequest } from '../../presentation/dtos/authentication.dto';
import { AuthenticationCommand, AuthenticationResult } from '../dtos/authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/core/application/services/user.service';
import { SignService } from './sign.service';
import { UserSignService } from './user-sign.service';

export abstract class AuthenticationService {
    abstract authenticate(command: AuthenticationCommand): AuthenticationResult;
}

@Injectable()
export class DefaultAuthenticationService implements AuthenticationService {
    constructor(private readonly userService: UserService,
        private readonly userSignService: UserSignService) { }

    authenticate(command: AuthenticationCommand): AuthenticationResult {
        const user = this.userService.findByEmail(command.email);
        if (user === undefined || user.password !== command.password) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: this.userSignService.sign(user)
        };
    }
}