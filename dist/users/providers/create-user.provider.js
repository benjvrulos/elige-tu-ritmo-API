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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const typeorm_2 = require("typeorm");
const hashing_provider_1 = require("../../auth/providers/hashing.provider");
let CreateUserProvider = class CreateUserProvider {
    usersRepository;
    hashingProvider;
    constructor(usersRepository, hashingProvider) {
        this.usersRepository = usersRepository;
        this.hashingProvider = hashingProvider;
    }
    async createUser(createUserDto) {
        let existingUser;
        try {
            existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email },
            });
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, please try later', { description: 'Error conecting to the database' });
        }
        if (existingUser) {
            throw new common_1.BadRequestException('The user already exists, please check your email');
        }
        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password),
        });
        try {
            newUser = await this.usersRepository.save(newUser);
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, please try later', { description: 'Error conecting to the database' });
        }
        return newUser;
    }
};
exports.CreateUserProvider = CreateUserProvider;
exports.CreateUserProvider = CreateUserProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => hashing_provider_1.HashingProvider))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider])
], CreateUserProvider);
//# sourceMappingURL=create-user.provider.js.map