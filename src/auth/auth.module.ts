import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from './jwt';
import { ConfigurationModule } from 'src/shared/configuration/configuration.module';
import { AuthUserModule } from './user/user.module';

@Module({
    imports: [
        forwardRef(() => JwtModule),
        AuthUserModule
    ]
})
export class AuthModule {
}
