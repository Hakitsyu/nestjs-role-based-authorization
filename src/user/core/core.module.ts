import { Injectable, Module } from '@nestjs/common';
import { DefaultUserService, UserService } from './application/services/user.service';
import { UserPersistanceModule } from '../persistance/persistance.module';
import { BanService, DefaultBanService } from './application/services/ban.service';

@Module({
    imports: [UserPersistanceModule],
    providers: [
        {
            provide: UserService,
            useClass: DefaultUserService
        },
        {
            provide: BanService,
            useClass: DefaultBanService
        }
    ],
    exports: [
        UserService,
        BanService
    ]
})
export class UserCoreModule {

}