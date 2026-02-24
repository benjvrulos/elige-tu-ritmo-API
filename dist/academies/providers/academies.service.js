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
exports.AcademiesService = void 0;
const common_1 = require("@nestjs/common");
const academy_entity_1 = require("../academy.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_academy_dto_1 = require("../dtos/create-academy.dto");
const users_service_1 = require("../../users/providers/users.service");
const comunas_service_1 = require("../../comunas/providers/comunas.service");
let AcademiesService = class AcademiesService {
    usersService;
    comunaService;
    academyRepository;
    constructor(usersService, comunaService, academyRepository) {
        this.usersService = usersService;
        this.comunaService = comunaService;
        this.academyRepository = academyRepository;
    }
    async findAll() {
        return await this.academyRepository.find();
    }
    async create(createAcademyDto) {
        const user = await this.usersService.findOneById(createAcademyDto.user_id);
        const comuna = await this.comunaService.findOneById(createAcademyDto.comuna_id);
        if (user && comuna) {
            const academy = this.academyRepository.create({
                ...createAcademyDto,
                user: user,
                comuna: comuna,
            });
            return await this.academyRepository.save(academy);
        }
    }
    async findOneById(academy_id) {
        return await this.academyRepository.findOneBy({ academy_id });
    }
};
exports.AcademiesService = AcademiesService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academy_dto_1.CreateAcademyDto]),
    __metadata("design:returntype", Promise)
], AcademiesService.prototype, "create", null);
exports.AcademiesService = AcademiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(academy_entity_1.Academy)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        comunas_service_1.ComunasService,
        typeorm_2.Repository])
], AcademiesService);
//# sourceMappingURL=academies.service.js.map