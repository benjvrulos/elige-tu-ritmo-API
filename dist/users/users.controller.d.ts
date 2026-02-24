import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user-dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(getUsersParamDto: GetUsersParamDto, limit: number, page: number): {
        firstName: string;
        email: string;
    }[];
    createUsers(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
}
