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
exports.StylesController = void 0;
const common_1 = require("@nestjs/common");
const styles_service_1 = require("./providers/styles.service");
const swagger_1 = require("@nestjs/swagger");
const create_style_dto_1 = require("./dtos/create-style.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const auth_type_enum_1 = require("../auth/enums/auth-type.enum");
let StylesController = class StylesController {
    stylesService;
    constructor(stylesService) {
        this.stylesService = stylesService;
    }
    createStyle(createStyleDto) {
        return this.stylesService.create(createStyleDto);
    }
    getAllStyles() {
        return this.stylesService.findAll();
    }
};
exports.StylesController = StylesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new style' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'You get a 201 response if you response is created successfully',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_style_dto_1.CreateStyleDto]),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "createStyle", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.None),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StylesController.prototype, "getAllStyles", null);
exports.StylesController = StylesController = __decorate([
    (0, common_1.Controller)('styles'),
    __metadata("design:paramtypes", [styles_service_1.StylesService])
], StylesController);
//# sourceMappingURL=styles.controller.js.map