import { Controller, Get } from '@nestjs/common';
import { CurrentRequestAuthenticatedUserProvider } from 'src/auth/user/infra/services/request/current-request-authenticated-user-provider.service';
import { UserResponse } from '../dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly currentRequestAuthenticatedUserProvider: CurrentRequestAuthenticatedUserProvider) { }
    
    @Get()
    get(): UserResponse {
        const user = this.currentRequestAuthenticatedUserProvider.get();
        
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            currentBan: {
                expiresIn: user.currentBan?.expiresIn,
                administratorName: user.currentBan?.administrator?.name
            }
        }
    }
}