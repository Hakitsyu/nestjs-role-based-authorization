import { Injectable } from '@nestjs/common';
import { AuthConfiguration, ConfigurationService, JwtConfiguration } from 'src/configuration';

export abstract class JwtConfigurationProvider {
    abstract get(): JwtConfiguration;
}

@Injectable()
export class DefaultJwtConfigurationProvider implements JwtConfigurationProvider {
    constructor(private readonly configurationService: ConfigurationService) { }

    get() {
        return (this.configurationService.get('auth') as AuthConfiguration).jwt;
    }
}