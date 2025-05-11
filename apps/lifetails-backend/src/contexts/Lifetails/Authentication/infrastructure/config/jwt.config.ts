import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'lifetails-secret-key',
  accessTokenExpiresIn: '1h',
  refreshTokenExpiresIn: '7d',
}));
