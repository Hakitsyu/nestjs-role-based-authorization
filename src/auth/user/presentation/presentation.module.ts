import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthUserInfraModule } from '../infra/infra.module';

@Module({
    imports: [
        AuthUserInfraModule
    ],
    controllers: [
        AuthenticationController
    ]
})
export class AuthUserPresentationModule {

}