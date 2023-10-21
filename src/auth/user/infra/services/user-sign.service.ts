import { Injectable } from '@nestjs/common';
import { User } from 'src/user/core/domain/entities/user.entity';
import { SignService } from './sign.service';

export abstract class UserSignService {
    abstract sign(user: User): string    
}

@Injectable()
export class DefaultUserSignService implements UserSignService {
    constructor(private readonly signService: SignService) { }

    sign(user: User): string {
        return this.signService.sign({ 
            email: user.email, 
            name: user.name,
            role: user.role 
        })
    }
}