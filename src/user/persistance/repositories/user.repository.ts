import { Injectable } from '@nestjs/common';
import { UniqueSet } from 'src/shared/collection/unique-set';
import { User } from 'src/user/core/domain/entities/user.entity';
import { UserRepository } from 'src/user/core/domain/repositories/user.repository';
import { Users } from '../constants';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
    private readonly _users: UniqueSet<User, string>;

    constructor() {
        this._users = new UniqueSet<User, string>(u => u.id, Users);
    }

    update(user: User): void {
        if (this._users.has(user))
            this._users.delete(user);

        this._users.add(user);
    }

    findByEmail(email: string) {
        return this._users
            .asArray()
            .find(u => u.email === email);
    }
}