import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationRequest, AuthenticationResponse } from '../dtos/authentication.dto';
import { AuthenticationService } from '../../infra/services/authentication.service';
import { AuthenticationCommand } from '../../infra/dtos/authentication.dto';
import { NonAuthenticated } from 'src/auth/jwt/decorators/non-authenticated.decorator';

@Controller('auth/user')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post()
    @NonAuthenticated()
    authenticate(@Body() request: AuthenticationRequest): AuthenticationResponse {
        const command: AuthenticationCommand = {
            email: request.email,
            password: request.password
        };

        return this.authenticationService.authenticate(command);
    }
}