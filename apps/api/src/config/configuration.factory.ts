import {ConfigFactory} from '@nestjs/config';
import {checkIsValidEnvironment, Configuration, Environment} from './configuration.schema';

const { NODE_ENV, HOST, PORT, DATABASE_URL} = process.env

export const configurationFactory: ConfigFactory<Configuration> = () => {
  const config = new Configuration();

  config.app.nodeEnv = checkIsValidEnvironment(NODE_ENV) ? NODE_ENV : Environment.Development;
  config.app.port = parseInt(PORT || '3000', 10);
  config.app.host = HOST || 'localhost';

  config.database.url = DATABASE_URL || '';

  if (!config.database.url) {
    throw new Error(
      'DATABASE_URL environment variable is required. Please check your .env file.',
    );
  }

  if (!config.database.url.startsWith('postgresql://')) {
    throw new Error(
      'DATABASE_URL must be a valid PostgreSQL connection string',
    );
  }

  return config;
};
