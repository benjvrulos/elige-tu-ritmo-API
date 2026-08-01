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
exports.RefreshTokensProvider = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const generate_tokens_provider_1 = require("./generate-tokens.provider");
const users_service_1 = require("../../users/providers/users.service");
let RefreshTokensProvider = class RefreshTokensProvider {
    jwtService;
    jwtConfiguration;
    generateTokensProvider;
    usersService;
    constructor(jwtService, jwtConfiguration, generateTokensProvider, usersService) {
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.generateTokensProvider = generateTokensProvider;
        this.usersService = usersService;
    }
    async refrestTokens(refreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });
            const user = await this.usersService.findOneById(sub);
            return await this.generateTokensProvider.generateTokens(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.RefreshTokensProvider = RefreshTokensProvider;
exports.RefreshTokensProvider = RefreshTokensProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0, generate_tokens_provider_1.GenerateTokensProvider,
        users_service_1.UsersService])
], RefreshTokensProvider);
//# sourceMappingURL=refresh-tokens.provider.js.map