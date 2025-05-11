import { JwtTokenGenerator } from './JwtTokenGenerator';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

describe('JwtTokenGenerator', () => {
  let tokenGenerator: JwtTokenGenerator;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;
  let accountId: string;
  let userId: string;
  let email: string;

  beforeEach(() => {
    // Create mock implementations
    jest.clearAllMocks();
    accountId = faker.string.uuid();
    userId = faker.string.uuid();
    email = faker.internet.email();

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('token-mocked-for-test'),
      verifyAsync: jest.fn().mockResolvedValue({ sub: accountId, userId, email }),
    } as any;

    configService = {
      get: jest.fn((key) => {
        const config = {
          'jwt.secret': 'test-secret',
          'jwt.refreshSecret': 'test-refresh-secret',
          'jwt.accessTokenExpiresIn': '1m',
          'jwt.refreshTokenExpiresIn': '90d',
        };
        return config[key];
      }),
    } as any;

    // Directly instantiate with mocks
    tokenGenerator = new JwtTokenGenerator(jwtService, configService);
  });

  it('should be defined', () => {
    expect(tokenGenerator).toBeDefined();
  });

  it('should generate a token', async () => {
    const payload = { accountId, userId, email };

    const token = await tokenGenerator.generateToken(payload);

    expect(token).toEqual('token-mocked-for-test');
    expect(jwtService.signAsync).toHaveBeenCalledWith(
      {
        sub: payload.accountId,
        userId: payload.userId,
        email: payload.email,
      },
      {
        secret: 'test-secret',
        expiresIn: '1m',
      },
    );
  });

  it('should generate a refresh token', async () => {
    const payload = { accountId, userId, email };

    const refreshToken = await tokenGenerator.generateRefreshToken(payload);

    expect(refreshToken).toEqual('token-mocked-for-test');
    expect(jwtService.signAsync).toHaveBeenCalledWith(
      {
        sub: payload.accountId,
        userId: payload.userId,
        email: payload.email,
      },
      {
        secret: 'test-refresh-secret',
        expiresIn: '90d',
      },
    );
  });

  it('should throw an error when verifying an invalid token', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error('Invalid token'));

    await expect(tokenGenerator.verifyToken('invalid-token')).rejects.toThrow();
  });

  it('should verify a valid token', async () => {
    const result = await tokenGenerator.verifyToken('valid-token');

    expect(result).toEqual({ sub: accountId, userId, email });
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
      secret: 'test-secret',
    });
  });
});
