import { ConfigFactory, ConfigModuleOptions, ConfigObject } from '@nestjs/config';

export type ConfigurationOptions = {} & Partial<ConfigModuleOptions>;

export type ConfigurationFactory<TOptions extends ConfigurationOptions, T extends ConfigObject = ConfigObject> = (options: TOptions) => ConfigFactory<T>;