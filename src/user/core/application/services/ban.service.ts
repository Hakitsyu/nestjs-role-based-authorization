import { Injectable } from '@nestjs/common';
import { BanCommand } from '../dtos/ban.dto';
import { UserService } from './user.service';

export abstract class BanService {
    abstract ban(command: BanCommand): void
}

@Injectable()
export class DefaultBanService implements BanService {
    constructor(private readonly userService: UserService) { }

    ban(command: BanCommand): void {
        // ........
        command.user.ban(command.administrator, command.expiresIn);
        this.userService.update(command.user);
    }
}