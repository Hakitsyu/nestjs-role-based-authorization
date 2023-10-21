import { DynamicModule, Module } from '@nestjs/common';
import { YamlConfigurationOptions } from './yaml.configuration';
import { ConfigurationModule } from '../configuration.module';
import yaml from './yaml.configuration';
import { ConfigModuleOptions } from '@nestjs/config';

@Module({})
export class YamlConfigurationModule {
    static forRoot(options: YamlConfigurationOptions): DynamicModule {
        return ConfigurationModule.forRoot(yaml, options);
    }  
}