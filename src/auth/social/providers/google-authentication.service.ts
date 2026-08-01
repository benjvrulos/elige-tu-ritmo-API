import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }
  constructor(
    /**
     * Inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify access_token by calling Google's userinfo endpoint
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${googleTokenDto.token}` } },
      );

      if (!response.ok) {
        throw new UnauthorizedException('Invalid Google access token');
      }

      const userInfo = await response.json();

      const {
        sub: googleId,
        email,
        given_name: firstName,
        family_name: lastName,
      } = userInfo;

      if (!googleId || !email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      // Find or create user
      const existingUser = await this.usersService.findOneByGoogleId(googleId);
      if (existingUser) {
        return this.generateTokensProvider.generateTokens(existingUser);
      }

      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
