import { CreateUserDto } from '../dtos/create-user-dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
export declare class CreateUserProvider {
    readonly usersRepository: Repository<User>;
    private readonly hashingProvider;
    constructor(usersRepository: Repository<User>, hashingProvider: HashingProvider);
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
