import { User } from '../user.entity';
import { Repository } from 'typeorm';
export declare class FindOneByGoogleIdProvider {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneByGoogleId(googleId: string): Promise<User | null>;
}
