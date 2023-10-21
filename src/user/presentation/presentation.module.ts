import { Module, forwardRef } from '@nestjs/common';
import { UserCoreModule } from '../core/core.module';
import { BanController } from './controllers/ban.controller';
import { AuthUserModule } from 'src/auth/user/user.module';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        UserCoreModule,
        forwardRef(() => AuthUserModule)
    ],
    controllers: [
        UserController,
        BanController
    ]
})
export class UserPresentationModule {

}