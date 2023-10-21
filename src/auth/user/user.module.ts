import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationController } from './presentation/controllers/authentication.controller';
import { AuthUserPresentationModule } from './presentation/presentation.module';
import { AuthModule } from '../auth.module';
import { AuthUserInfraModule } from './infra/infra.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        AuthUserInfraModule,
        AuthUserPresentationModule,
    ],
    exports: [AuthUserInfraModule]
})
export class AuthUserModule {

}