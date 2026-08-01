import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user-dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { type ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { GoogleUser } from '../interfaces/google-user.interace';
import { CreateGoogleUserProvider } from './create-google-user.provider';
export declare class UsersService {
    private usersRepository;
    private readonly authService;
    private readonly profileConfiguration;
    private readonly createUserProvider;
    private readonly findOneUserByEamilProvider;
    private readonly findOneByGoogleIdProvider;
    private readonly createGoogleUserProvider;
    constructor(usersRepository: Repository<User>, authService: AuthService, profileConfiguration: ConfigType<typeof profileConfig>, createUserProvider: CreateUserProvider, findOneUserByEamilProvider: FindOneUserByEmailProvider, findOneByGoogleIdProvider: FindOneByGoogleIdProvider, createGoogleUserProvider: CreateGoogleUserProvider);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number): void;
    findOneById(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByGoogleId(googleId: string): Promise<User | null>;
    createGoogleUser(googleUser: GoogleUser): Promise<User>;
}
