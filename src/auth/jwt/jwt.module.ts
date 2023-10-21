import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/configuration';
import { JwtModule as DefaultJwtModule, JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { DefaultJwtConfigurationProvider, JwtConfigurationProvider } from './services/jwt-configuration-provider.service';
import { DefaultRequestJwtTokenProvider, RequestJwtTokenProvider } from './services/request/request-jwt-token-provider.service';
import { DefaultRequestJwtPayloadService, RequestJwtPayloadService } from './services/request/request-jwt-payload.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DefaultIsNonAuthenticatedRequestChecker, IsNonAuthenticatedRequestChecker } from './services/is-non-authenticated-request-checker.service';
import { CurrentRequestJwtPayloadProvider, DefaultCurrentRequestJwtPayloadProvider } from './services/request/current-request-jwt-payload-provider.service';

class DefaultJwtOptionsFactory implements JwtOptionsFactory {
    constructor(private readonly jwtConfigurationProvider: JwtConfigurationProvider) {}

    createJwtOptions(): JwtModuleOptions {
        const configuration = this.jwtConfigurationProvider.get();

        return {
            secret: configuration.secret,
            global: true,
            signOptions: {
                expiresIn: configuration.sign?.expires_in
            }
        }
    }
}

@Module({
    imports: [
        ConfigurationModule,
        DefaultJwtModule.registerAsync({
            imports: [JwtModule],
            useFactory: (provider: JwtConfigurationProvider) => new DefaultJwtOptionsFactory(provider).createJwtOptions(),
            inject: [JwtConfigurationProvider]
        })
    ],
    providers: [
        {
            provide: JwtConfigurationProvider,
            useClass: DefaultJwtConfigurationProvider,
        },
        {
            provide: RequestJwtTokenProvider,
            useClass: DefaultRequestJwtTokenProvider
        },
        {
            provide: RequestJwtPayloadService,
            useClass: DefaultRequestJwtPayloadService
        },
        {
            provide: IsNonAuthenticatedRequestChecker,
            useClass: DefaultIsNonAuthenticatedRequestChecker
        },
        {
            provide: CurrentRequestJwtPayloadProvider,
            useClass: DefaultCurrentRequestJwtPayloadProvider  
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
    exports: [
        DefaultJwtModule,
        JwtConfigurationProvider,
        RequestJwtPayloadService,
        CurrentRequestJwtPayloadProvider,
    ]
})
export class JwtModule {
}