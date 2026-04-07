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
exports.AcademiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const academies_service_1 = require("./providers/academies.service");
const create_academy_dto_1 = require("./dtos/create-academy.dto");
const get_academies_dto_1 = require("./dtos/get-academies.dto");
let AcademiesController = class AcademiesController {
    academyService;
    constructor(academyService) {
        this.academyService = academyService;
    }
    getAcademies(postQuery) {
        return this.academyService.findAll(postQuery);
    }
    getAcademy(academyId) {
        if (academyId) {
            return this.academyService.findOneById(Number(academyId));
        }
    }
    async createAcademy(createAcademyDto) {
        return this.academyService.create(createAcademyDto);
    }
};
exports.AcademiesController = AcademiesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all academies' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'You get a 200 response if you response is processed successfully',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_academies_dto_1.GetAcademiesDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve one academy by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'You get a 200 response if you response is processed successfully',
    }),
    (0, common_1.Get)(':academyId'),
    __param(0, (0, common_1.Param)(':academyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new academy post' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'You get a 201 response if you response is created successfully',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academy_dto_1.CreateAcademyDto]),
    __metadata("design:returntype", Promise)
], AcademiesController.prototype, "createAcademy", null);
exports.AcademiesController = AcademiesController = __decorate([
    (0, common_1.Controller)('academies'),
    (0, swagger_1.ApiTags)('Academies'),
    __metadata("design:paramtypes", [academies_service_1.AcademiesService])
], AcademiesController);
//# sourceMappingURL=academies.controller.js.map