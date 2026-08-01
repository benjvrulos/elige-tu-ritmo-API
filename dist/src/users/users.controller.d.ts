import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { type ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: ActiveUserData): Promise<import("./user.entity").User>;
    getUsers(getUsersParamDto: GetUsersParamDto, limit: number, page: number): void;
    createUsers(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
}
