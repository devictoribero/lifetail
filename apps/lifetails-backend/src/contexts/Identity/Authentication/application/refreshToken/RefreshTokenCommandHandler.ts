import { Injectable } from '@nestjs/common';
import { RefreshTokenCommand } from './RefreshTokenCommand';
import { JwtTokenGenerator } from '../../infrastructure/services/JwtTokenGenerator';
import { InvalidTokenException } from '../../domain/exceptions/InvalidTokenException';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

type RefreshTokenCommandHandlerResponse = {
  token: string;
  refreshToken: string;
};

@Injectable()
export class RefreshTokenCommandHandler
  implements CommandHandler<RefreshTokenCommand, RefreshTokenCommandHandlerResponse>
{
  constructor(
    private readonly tokenGenerator: JwtTokenGenerator,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handle(command: RefreshTokenCommand): Promise<{
    token: string;
    refreshToken: string;
  }> {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(command.refreshToken, {
        secret: this.configService.get('jwt.refreshSecret'),
      });

      const tokenPayload = {
        accountId: payload.sub,
        userId: payload.userId,
        email: payload.email,
      };

      // Generate new tokens
      const newToken = await this.tokenGenerator.generateToken(tokenPayload);
      const newRefreshToken = await this.tokenGenerator.generateRefreshToken(tokenPayload);

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
