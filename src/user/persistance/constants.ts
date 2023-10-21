import { UniqueSet } from 'src/shared/collection';
import { User } from '../core/domain/entities/user.entity';
import { UserRole } from '../core/domain/enumerators/user-role.enum';

export const Users: User[] = [
    User.create('001', 'gilberto', 'gilberto@ooooooooooo.com', '321', {
        role: UserRole.Admin
    }),
    User.create('002', 'roberto', 'roberto@ooooooooooo.com', '123')
]