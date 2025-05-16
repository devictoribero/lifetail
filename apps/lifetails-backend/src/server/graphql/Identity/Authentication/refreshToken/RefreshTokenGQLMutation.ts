import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RefreshTokenResponse } from './RefreshTokenResponse';
import { RefreshTokenInput } from './RefreshTokenInput';
import { RefreshTokenCommand } from 'src/contexts/Identity/Authentication/application/refreshToken/RefreshTokenCommand';
import { RefreshTokenCommandHandler } from 'src/contexts/Identity/Authentication/application/refreshToken/RefreshTokenCommandHandler';
import { InvalidTokenException } from 'src/contexts/Identity/Authentication/domain/exceptions/InvalidTokenException';
import { Public } from 'src/server/graphql/Shared/decorators/Public';

@Resolver()
export class RefreshTokenGQLMutation {
  constructor(private readonly commandHandler: RefreshTokenCommandHandler) {}

  @Public()
  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Args('input') input: RefreshTokenInput): Promise<RefreshTokenResponse> {
    const command = new RefreshTokenCommand(input.refreshToken);
    const result = await this.commandHandler.handle(command);

    return {
      token: result.token,
      refreshToken: result.refreshToken,
    };
  }
}
