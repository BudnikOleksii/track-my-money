import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';

import { AuthConfig, authConfigSchema } from './auth.config';

const configValues: Partial<AuthConfig> = {
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
  activationLinkExpiresIn: process.env.ACTIVATION_LINK_EXPIRES_IN,
};

export default registerAs('auth', (): AuthConfig => {
  const { error, value } = authConfigSchema.validate(configValues, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Auth configuration validation failed: ${error.details
        .map((detail) => detail.message)
        .join(', ')}`,
    );
  }

  return value;
});
