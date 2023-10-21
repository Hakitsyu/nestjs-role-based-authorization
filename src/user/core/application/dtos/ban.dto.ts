import { User } from '../../domain/entities/user.entity';

export interface BanCommand {
    administrator: User,
    user: User,
    expiresIn?: Date
}