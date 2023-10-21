import { User } from 'src/user/core/domain/entities/user.entity';
import { SignPayload } from '../dtos/sign.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

export abstract class SignService {
    abstract sign(payload: SignPayload): string;
}

@Injectable()
export class DefaultSignService implements SignService {
    constructor(private readonly jwtService: JwtService) { }
    
    sign(payload: SignPayload): string {
        return this.jwtService.sign(payload);
    }
}