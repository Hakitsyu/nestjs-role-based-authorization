import { User } from '../entities/user.entity';

export abstract class UserRepository {
    abstract findByEmail(email: string): User;
    abstract update(user: User): void;
}