import { registerAs } from '@nestjs/config';

import { AppConfig, appConfigSchema, Environment } from './app.config';

const configValues: Partial<AppConfig> = {
  nodeEnv: process.env.NODE_ENV as Environment,
  port: parseInt(process.env.PORT ?? '3000', 10),
  host: process.env.HOST,
};

export default registerAs('app', (): AppConfig => {
  const { error, value } = appConfigSchema.validate(configValues, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `App configuration validation failed: ${error.details
        .map((detail) => detail.message)
        .join(', ')}`,
    );
  }

  return value;
});
