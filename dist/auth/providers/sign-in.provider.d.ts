import { SignInDto } from '../dtos/signIn.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
export declare class SignInProvider {
    private readonly usersService;
    private readonly hashingProvider;
    private readonly generateTokensProvider;
    constructor(usersService: UsersService, hashingProvider: HashingProvider, generateTokensProvider: GenerateTokensProvider);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
