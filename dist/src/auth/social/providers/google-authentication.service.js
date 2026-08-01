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
exports.GoogleAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const jwt_config_1 = __importDefault(require("../../config/jwt.config"));
const users_service_1 = require("../../../users/providers/users.service");
const generate_tokens_provider_1 = require("../../providers/generate-tokens.provider");
let GoogleAuthenticationService = class GoogleAuthenticationService {
    usersService;
    jwtConfiguration;
    generateTokensProvider;
    oauthClient;
    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
    }
    constructor(usersService, jwtConfiguration, generateTokensProvider) {
        this.usersService = usersService;
        this.jwtConfiguration = jwtConfiguration;
        this.generateTokensProvider = generateTokensProvider;
    }
    async authenticate(googleTokenDto) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${googleTokenDto.token}` } });
            if (!response.ok) {
                throw new common_1.UnauthorizedException('Invalid Google access token');
            }
            const userInfo = await response.json();
            const { sub: googleId, email, given_name: firstName, family_name: lastName, } = userInfo;
            if (!googleId || !email) {
                throw new common_1.UnauthorizedException('Invalid Google token payload');
            }
            const existingUser = await this.usersService.findOneByGoogleId(googleId);
            if (existingUser) {
                return this.generateTokensProvider.generateTokens(existingUser);
            }
            const newUser = await this.usersService.createGoogleUser({
                email,
                firstName: firstName ?? '',
                lastName: lastName ?? '',
                googleId,
            });
            return this.generateTokensProvider.generateTokens(newUser);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid Google token');
        }
    }
};
exports.GoogleAuthenticationService = GoogleAuthenticationService;
exports.GoogleAuthenticationService = GoogleAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [users_service_1.UsersService, void 0, generate_tokens_provider_1.GenerateTokensProvider])
], GoogleAuthenticationService);
//# sourceMappingURL=google-authentication.service.js.map