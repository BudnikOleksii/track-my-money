import { registerAs } from '@nestjs/config';
import { DatabaseConfig, databaseConfigSchema } from './database.config';

const configValues: Partial<DatabaseConfig> = {
  url: process.env.DATABASE_URL,
};

export default registerAs('database', (): DatabaseConfig => {
  const { error, value } = databaseConfigSchema.validate(configValues, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Database configuration validation failed: ${error.details
        .map((detail) => detail.message)
        .join(', ')}`,
    );
  }

  return value;
});
