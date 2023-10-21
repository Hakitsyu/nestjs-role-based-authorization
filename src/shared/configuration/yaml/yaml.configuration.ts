import { readFileSync } from 'fs';
import { ConfigurationFactory, ConfigurationOptions } from '../configuration';
import * as yaml from 'js-yaml';

export type YamlConfigurationPathFactory = () => string;

export type YamlConfigurationPathType = string | YamlConfigurationPathFactory;

export type YamlConfigurationOptions = {
    path: YamlConfigurationPathType
} & ConfigurationOptions;

export type YamlConfigurationFactory = ConfigurationFactory<YamlConfigurationOptions>;

const configurationFactory: YamlConfigurationFactory = (options: YamlConfigurationOptions) => () => {
    const path = typeof(options.path) == 'string' 
        ? options.path : options.path();

    return yaml.load(
        readFileSync(path, 'utf8')
    ) as Record<string, any>;
}    

export default configurationFactory;