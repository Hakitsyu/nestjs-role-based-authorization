import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BanService } from 'src/user/core/application/services/ban.service';
import { BanRequest, BanResponse } from '../dtos/ban.dto';
import { CurrentRequestAuthenticatedUserProvider } from 'src/auth/user/infra/services/request/current-request-authenticated-user-provider.service';
import { UserService } from 'src/user/core/application/services/user.service';
import { NotFoundUserException } from '../exceptions/not-found-user.exception';
import { Roles } from 'src/auth/user/infra/decorators/roles.decorator';
import { UserRole } from 'src/user/core/domain/enumerators/user-role.enum';

@Controller('user/ban')
export class BanController {
    constructor(private readonly banService: BanService,
        private readonly currentRequestAuthenticatedUserProvider: CurrentRequestAuthenticatedUserProvider,
        private readonly userService: UserService) { }

    @Post()
    @Roles(UserRole.Admin)
    ban(@Body() request: BanRequest): BanResponse {
        const currentUser = this.currentRequestAuthenticatedUserProvider.get();
        const user = this.userService.findByEmail(request.user);
        if (!user) {
            throw new NotFoundUserException();
        }

        try {
            this.banService.ban({ administrator: currentUser, user });

            return {
                user: user.email
            }
        } catch {
            throw new BadRequestException();
        }
    }
}