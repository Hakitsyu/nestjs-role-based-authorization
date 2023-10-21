import { Injectable, Module } from '@nestjs/common';
import { resolve } from 'path';
import { YamlConfigurationModule } from 'src/shared/configuration';
import { ConfigurationService } from './configuration.service';

@Module({
    imports: [
        YamlConfigurationModule.forRoot({
            path: () => resolve(__dirname, '..', 'config.yaml'),
            isGlobal: true
        })
    ],
    providers: [ConfigurationService],
    exports: [ConfigurationService]
})
export class ConfigurationModule {
    
}