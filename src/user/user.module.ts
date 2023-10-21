import { Module } from '@nestjs/common';
import { UserPersistanceModule } from './persistance/persistance.module';
import { UserService } from './core/application/services/user.service';
import { UserCoreModule } from './core/core.module';
import { UserPresentationModule } from './presentation/presentation.module';

@Module({
    imports: [
        UserPersistanceModule,
        UserCoreModule,
        UserPresentationModule
    ],
    exports: [
        UserCoreModule
    ]
})
export class UserModule {

}
