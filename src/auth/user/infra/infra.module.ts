import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService, DefaultAuthenticationService } from './services/authentication.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/auth/jwt';
import { DefaultSignService, SignService } from './services/sign.service';
import { DefaultUserSignService, UserSignService } from './services/user-sign.service';
import { CurrentRequestAuthenticatedUserProvider, DefaultCurrentRequestAuthenticatedUserProvider } from './services/request/current-request-authenticated-user-provider.service';

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
        }
    ],
    exports: [
        AuthenticationService,
        CurrentRequestAuthenticatedUserProvider
    ]
})
export class AuthUserInfraModule {

}