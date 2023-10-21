export interface AuthenticationCommand {
    email: string,
    password: string
}

export interface AuthenticationResult {
    accessToken: string
}