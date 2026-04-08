import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user-dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { type ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    /**
     *Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // Injecting ConfigService
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    // Injectin CreateUserProvider
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject findOneUserByEamilProvider
     */
    private readonly findOneUserByEamilProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * The method to get all users from the database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Ocurred because the API endpoint was permanentely moved',
      },
    );
  }

  /**
   * Find a single user using the ID of the user
   */

  public async findOneById(id: number) {
    let user: User | null;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        { description: 'Error conecting to the database' },
      );
    }

    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }
    return user;
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEamilProvider.findOneByEmail(email);
  }
}
