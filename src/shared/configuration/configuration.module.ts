import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurationFactory, ConfigurationOptions } from './configuration';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

@Module({})
export class ConfigurationModule {
    static forRoot<TOptions extends ConfigurationOptions>(factory: ConfigurationFactory<TOptions>, options: TOptions): DynamicModule {
        return ConfigModule.forRoot({
            ...options,
            load: [factory(options)],
        });
    }
}