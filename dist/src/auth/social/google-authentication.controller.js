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
exports.GoogleAuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const google_authentication_service_1 = require("./providers/google-authentication.service");
const google_token_dto_1 = require("./dtos/google-token.dto");
const auth_decorator_1 = require("../decorators/auth.decorator");
const auth_type_enum_1 = require("../enums/auth-type.enum");
let GoogleAuthenticationController = class GoogleAuthenticationController {
    googleAuthenticationService;
    constructor(googleAuthenticationService) {
        this.googleAuthenticationService = googleAuthenticationService;
    }
    authenticate(googleTokenDto) {
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
};
exports.GoogleAuthenticationController = GoogleAuthenticationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_token_dto_1.GoogleTokenDto]),
    __metadata("design:returntype", void 0)
], GoogleAuthenticationController.prototype, "authenticate", null);
exports.GoogleAuthenticationController = GoogleAuthenticationController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None),
    (0, common_1.Controller)('auth/google-authentication'),
    __metadata("design:paramtypes", [google_authentication_service_1.GoogleAuthenticationService])
], GoogleAuthenticationController);
//# sourceMappingURL=google-authentication.controller.js.map