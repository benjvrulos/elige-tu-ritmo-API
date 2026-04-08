import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user-dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { type ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
export declare class UsersService {
    private usersRepository;
    private readonly authService;
    private readonly profileConfiguration;
    private readonly createUserProvider;
    private readonly findOneUserByEamilProvider;
    constructor(usersRepository: Repository<User>, authService: AuthService, profileConfiguration: ConfigType<typeof profileConfig>, createUserProvider: CreateUserProvider, findOneUserByEamilProvider: FindOneUserByEmailProvider);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number): void;
    findOneById(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
