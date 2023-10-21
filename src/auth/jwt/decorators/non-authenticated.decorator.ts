import { SetMetadata } from '@nestjs/common';

export const NON_AUTHENTICATED_KEY = 'jwtNonAuthenticatedKey';
export const NonAuthenticated = () => SetMetadata(NON_AUTHENTICATED_KEY, true);