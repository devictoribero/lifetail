import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'lifetails-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'lifetails-refresh-secret-key',
  accessTokenExpiresIn: '1d',
  refreshTokenExpiresIn: '90d',
}));
