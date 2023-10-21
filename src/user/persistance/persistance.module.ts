import { Module } from '@nestjs/common';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { InMemoryUserRepository } from '../persistance/repositories/user.repository';

@Module({
    providers: [
        {
            provide: UserRepository,
            useClass: InMemoryUserRepository
        }
    ],
    exports: [UserRepository]
})
export class UserPersistanceModule {

}