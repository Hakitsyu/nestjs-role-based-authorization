import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthenticationRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export interface AuthenticationResponse {
    accessToken: string
}