import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

export abstract class UserService {
    abstract findByEmail(email: string): User;
    abstract update(user: User): void;
}

@Injectable()
export class DefaultUserService implements UserService {
    constructor(private readonly repository: UserRepository) {}

    findByEmail(email: string) {
        return this.repository.findByEmail(email);
    }

    update(user: User) {
        this.repository.update(user);
    }
}