export interface JwtSignConfiguration {
    expires_in?: string | number
}

export interface JwtConfiguration {
    secret: string,
    sign: JwtSignConfiguration
}

export interface AuthConfiguration {
    jwt: JwtConfiguration
}

export interface Configuration {
    auth: AuthConfiguration
}