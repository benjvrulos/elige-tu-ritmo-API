import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user-dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { type ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
export declare class UsersService {
    private usersRepository;
    private readonly profileConfiguration;
    constructor(usersRepository: Repository<User>, profileConfiguration: ConfigType<typeof profileConfig>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number): {
        firstName: string;
        email: string;
    }[];
    findOneById(id: number): Promise<User | null>;
}
