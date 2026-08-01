import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { GoogleUser } from '../interfaces/google-user.interace';
export declare class CreateGoogleUserProvider {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    createGoogleUser(googleUser: GoogleUser): Promise<User>;
}
