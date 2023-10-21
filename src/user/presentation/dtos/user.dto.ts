import { UserRole } from 'src/user/core/domain/enumerators/user-role.enum';
import { Ban } from 'src/user/core/domain/value-objects/ban.value-object';

export interface UserResponse {
    email: string,
    name: string,
    role: UserRole,
    currentBan?: UserResponseBan
}

export interface UserResponseBan {
    administratorName: string,
    expiresIn: Date
}