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
exports.CreateAcademyProvider = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/providers/users.service");
const comunas_service_1 = require("../../comunas/providers/comunas.service");
const styles_service_1 = require("../../styles/providers/styles.service");
const typeorm_1 = require("typeorm");
const academy_entity_1 = require("../academy.entity");
const typeorm_2 = require("@nestjs/typeorm");
let CreateAcademyProvider = class CreateAcademyProvider {
    academyRepository;
    usersService;
    comunaService;
    stylesService;
    constructor(academyRepository, usersService, comunaService, stylesService) {
        this.academyRepository = academyRepository;
        this.usersService = usersService;
        this.comunaService = comunaService;
        this.stylesService = stylesService;
    }
    async create(createAcademyDto, user) {
        let creator = null;
        let comuna = null;
        let styles = [];
        try {
            creator = await this.usersService.findOneById(user.sub);
            comuna = await this.comunaService.findOneById(createAcademyDto.comuna_id);
            if (createAcademyDto.style_ids) {
                styles = await this.stylesService.findMultipleStyles(createAcademyDto.style_ids);
            }
        }
        catch (error) {
            throw new common_1.ConflictException(error);
        }
        if (createAcademyDto.style_ids.length !== styles.length) {
            throw new common_1.BadRequestException('Please check your style ids');
        }
        if (comuna && styles) {
            const academy = this.academyRepository.create({
                ...createAcademyDto,
                user: creator,
                comuna,
                styles,
            });
            try {
                return await this.academyRepository.save(academy);
            }
            catch (error) {
                throw new common_1.ConflictException(error, {
                    description: 'Ensure academy name is unique a not a duplicate',
                });
            }
        }
    }
};
exports.CreateAcademyProvider = CreateAcademyProvider;
exports.CreateAcademyProvider = CreateAcademyProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(academy_entity_1.Academy)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        comunas_service_1.ComunasService,
        styles_service_1.StylesService])
], CreateAcademyProvider);
//# sourceMappingURL=create-academy.provider.js.map