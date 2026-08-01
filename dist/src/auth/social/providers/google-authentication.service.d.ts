import { OnModuleInit } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
export declare class GoogleAuthenticationService implements OnModuleInit {
    private readonly usersService;
    private readonly jwtConfiguration;
    private readonly generateTokensProvider;
    private oauthClient;
    onModuleInit(): void;
    constructor(usersService: UsersService, jwtConfiguration: ConfigType<typeof jwtConfig>, generateTokensProvider: GenerateTokensProvider);
    authenticate(googleTokenDto: GoogleTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
