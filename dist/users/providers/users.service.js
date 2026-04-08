"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user.entity");
const profile_config_1 = __importDefault(require("../config/profile.config"));
const auth_service_1 = require("../../auth/providers/auth.service");
const create_user_provider_1 = require("./create-user.provider");
const find_one_user_by_email_provider_1 = require("./find-one-user-by-email.provider");
let UsersService = class UsersService {
    usersRepository;
    authService;
    profileConfiguration;
    createUserProvider;
    findOneUserByEamilProvider;
    constructor(usersRepository, authService, profileConfiguration, createUserProvider, findOneUserByEamilProvider) {
        this.usersRepository = usersRepository;
        this.authService = authService;
        this.profileConfiguration = profileConfiguration;
        this.createUserProvider = createUserProvider;
        this.findOneUserByEamilProvider = findOneUserByEamilProvider;
    }
    async createUser(createUserDto) {
        return this.createUserProvider.createUser(createUserDto);
    }
    findAll(getUsersParamDto, limit, page) {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.MOVED_PERMANENTLY,
            error: 'The API endpoint does not exist',
            fileName: 'users.service.ts',
            lineNumber: 88,
        }, common_1.HttpStatus.MOVED_PERMANENTLY, {
            cause: new Error(),
            description: 'Ocurred because the API endpoint was permanentely moved',
        });
    }
    async findOneById(id) {
        let user;
        try {
            user = await this.usersRepository.findOneBy({ id });
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment please try later', { description: 'Error conecting to the database' });
        }
        if (!user) {
            throw new common_1.BadRequestException('The user id does not exist');
        }
        return user;
    }
    async findOneByEmail(email) {
        return await this.findOneUserByEamilProvider.findOneByEmail(email);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(2, (0, common_1.Inject)(profile_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService, void 0, create_user_provider_1.CreateUserProvider,
        find_one_user_by_email_provider_1.FindOneUserByEmailProvider])
], UsersService);
//# sourceMappingURL=users.service.js.map