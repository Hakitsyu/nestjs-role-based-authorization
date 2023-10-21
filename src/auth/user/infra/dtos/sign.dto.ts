import { UserRole } from 'src/user/core/domain/enumerators/user-role.enum'

export type SignPayload = {
    email: string,
    name: string,
    role: UserRole
}