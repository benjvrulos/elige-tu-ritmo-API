import { SignInDto } from '../dtos/signIn.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { type ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
export declare class SignInProvider {
    private readonly usersService;
    private readonly hashingProvider;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(usersService: UsersService, hashingProvider: HashingProvider, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
}
