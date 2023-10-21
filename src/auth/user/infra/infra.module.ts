import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService, DefaultAuthenticationService } from './services/authentication.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/auth/jwt';
import { DefaultSignService, SignService } from './services/sign.service';
import { DefaultUserSignService, UserSignService } from './services/user-sign.service';
import { CurrentRequestAuthenticatedUserProvider, DefaultCurrentRequestAuthenticatedUserProvider } from './services/request/current-request-authenticated-user-provider.service';
import DefaultRequestAuthenticatedUserProvider, { RequestAuthenticatedUserProvider } from './services/request/request-authenticated-user-provider.service';
import { APP_GUARD } from '@nestjs/core';
import { UserRoleGuard } from './guards/role.guard';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule
    ],
    providers: [
        {
            provide: AuthenticationService,
            useClass: DefaultAuthenticationService
        },
        {
            provide: SignService,
            useClass: DefaultSignService
        },
        {
            provide: UserSignService,
            useClass: DefaultUserSignService
        },
        {
            provide: CurrentRequestAuthenticatedUserProvider,
            useClass: DefaultCurrentRequestAuthenticatedUserProvider
        },
        {
            provide: RequestAuthenticatedUserProvider,
            useClass: DefaultRequestAuthenticatedUserProvider
        },
        {
            provide: APP_GUARD,
            useClass: UserRoleGuard
        }
    ],
    exports: [
        AuthenticationService,
        CurrentRequestAuthenticatedUserProvider
    ]
})
export class AuthUserInfraModule {

}