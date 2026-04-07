import { UsersService } from 'src/users/providers/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(email: string, password: string, id: string): string;
    isAuth(): boolean;
}
