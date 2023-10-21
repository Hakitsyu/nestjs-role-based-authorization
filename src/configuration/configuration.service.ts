import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

export type ConfigurationKeyType = keyof Configuration;

@Injectable()
export class ConfigurationService {
    constructor(private readonly configService: ConfigService<Configuration>) {}

    get<T extends ConfigurationKeyType>(key: T) {
        return this.configService.get(key);
    }
}