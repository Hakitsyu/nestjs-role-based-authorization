import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/core/domain/enumerators/user-role.enum';

export const ROLES_KEY = 'userRoles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);