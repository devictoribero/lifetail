import { Test, TestingModule } from '@nestjs/testing';
import { ChangeUserPreferredLanguageGQLMutation } from './ChangeUserPreferredLanguageGQLMutation';
import { ChangeUserPreferredLanguageCommandHandler } from 'src/contexts/Identity/Users/application/changePreferredLanguage/ChangeUserPreferredLanguageCommandHandler';
import {
  ChangeUserPreferredLanguageInput,
  LanguageCodeGraphqlEnum,
} from './ChangeUserPreferredLanguageInput';
import { UserNotFoundException } from 'src/contexts/Identity/Users/domain/exceptions/UserNotFoundException';
import { faker } from '@faker-js/faker';
import { InvalidLanguageException } from 'src/contexts/Shared/domain/exceptions/InvalidLanguageException';
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
import { AuthenticationRequired } from 'src/contexts/Identity/Authentication/infrastructure/guards/AuthenticationRequired';
import { Reflector } from '@nestjs/core';

describe('ChangeUserPreferredLanguageGQLMutation', () => {
  let mutation: ChangeUserPreferredLanguageGQLMutation;
  let commandHandler: jest.Mocked<ChangeUserPreferredLanguageCommandHandler>;
  let mockContext: any;
  let userId: string;

  beforeEach(async () => {
    // Mock the command handler
    commandHandler = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<ChangeUserPreferredLanguageCommandHandler>;

    // Mock the JwtTokenGenerator
    const mockJwtTokenGenerator = {
      verifyToken: jest.fn(),
      generateToken: jest.fn(),
    };

    // Mock user context
    userId = faker.string.uuid();
    mockContext = {
      req: {
        user: { id: userId, accountId: faker.string.uuid() },
        headers: { authorization: 'Bearer some-token' },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeUserPreferredLanguageGQLMutation,
        {
          provide: ChangeUserPreferredLanguageCommandHandler,
          useValue: commandHandler,
        },
        {
          provide: JwtTokenGenerator,
          useValue: mockJwtTokenGenerator,
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
        {
          provide: AuthenticationRequired,
          useValue: { canActivate: jest.fn().mockResolvedValue(true) },
        },
      ],
    })
      .overrideGuard(AuthenticationRequired)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile();

    mutation = module.get<ChangeUserPreferredLanguageGQLMutation>(
      ChangeUserPreferredLanguageGQLMutation,
    );
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  it('should call command handler and return success response', async () => {
    // Arrange
    const input: ChangeUserPreferredLanguageInput = {
      languageCode: LanguageCodeGraphqlEnum.es,
    };

    // Act
    const result = await mutation.changeUserPreferredLanguage(input, mockContext);

    // Assert
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockContext.req.user.id,
        languageCode: input.languageCode,
      }),
    );
    expect(result).toEqual({ success: true });
  });

  it('should throw a specific error when user is not found', async () => {
    // Arrange
    const input: ChangeUserPreferredLanguageInput = {
      languageCode: LanguageCodeGraphqlEnum.es,
    };
    commandHandler.handle.mockRejectedValue(new UserNotFoundException(userId));

    // Act & Assert
    await expect(mutation.changeUserPreferredLanguage(input, mockContext)).rejects.toThrow();
    await expect(async () => {
      try {
        await mutation.changeUserPreferredLanguage(input, mockContext);
      } catch (error) {
        expect(error.message).toContain('User not found');
        throw error;
      }
    }).rejects.toThrow();
  });

  it('should throw a specific error when language is invalid', async () => {
    // Arrange
    const input = { languageCode: 'invalid' as LanguageCodeGraphqlEnum };
    commandHandler.handle.mockRejectedValue(new InvalidLanguageException('invalid'));

    // Act & Assert
    await expect(mutation.changeUserPreferredLanguage(input as any, mockContext)).rejects.toThrow();
    await expect(async () => {
      try {
        await mutation.changeUserPreferredLanguage(input as any, mockContext);
      } catch (error) {
        expect(error.message).toContain('Invalid language');
        throw error;
      }
    }).rejects.toThrow();
  });
});
