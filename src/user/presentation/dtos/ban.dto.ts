import { IsNotEmpty } from 'class-validator';

export class BanRequest {
    @IsNotEmpty()
    user: string;
}

export interface BanResponse {
    user: string
}