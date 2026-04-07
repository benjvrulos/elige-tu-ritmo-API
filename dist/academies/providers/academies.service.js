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
const styles_service_1 = require("../../styles/providers/styles.service");
const pagination_provider_1 = require("../../common/pagination/providers/pagination.provider");
let AcademiesService = class AcademiesService {
    academyRepository;
    usersService;
    comunaService;
    stylesService;
    paginationProvider;
    constructor(academyRepository, usersService, comunaService, stylesService, paginationProvider) {
        this.academyRepository = academyRepository;
        this.usersService = usersService;
        this.comunaService = comunaService;
        this.stylesService = stylesService;
        this.paginationProvider = paginationProvider;
    }
    async findAll(postQuery) {
        const academies = await this.paginationProvider.paginateQuery({ limit: postQuery.limit, page: postQuery.page }, this.academyRepository);
        return academies;
    }
    async create(createAcademyDto) {
        const user = await this.usersService.findOneById(createAcademyDto.user_id);
        const comuna = await this.comunaService.findOneById(createAcademyDto.comuna_id);
        let styles = [];
        if (createAcademyDto.style_ids) {
            styles = await this.stylesService.findMultipleStyles(createAcademyDto.style_ids);
        }
        if (user && comuna && styles) {
            const academy = this.academyRepository.create({
                ...createAcademyDto,
                user,
                comuna,
                styles,
            });
            return await this.academyRepository.save(academy);
        }
    }
    async update(patchAcademyDto) {
        let styles = [];
        let academy = null;
        try {
            if (patchAcademyDto.style_ids) {
                styles = await this.stylesService.findMultipleStyles(patchAcademyDto?.style_ids);
            }
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database',
            });
        }
        if (!styles || styles.length !== patchAcademyDto.style_ids?.length) {
            throw new common_1.BadRequestException('Please check your tag Ids and ensure they are correct');
        }
        try {
            academy = await this.academyRepository.findOneBy({
                academy_id: patchAcademyDto.id,
            });
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database',
            });
        }
        if (!academy) {
            throw new common_1.BadRequestException('The academy Id does not exist');
        }
        academy.name = patchAcademyDto.name ?? academy.name;
        academy.location = patchAcademyDto.location ?? academy.location;
        academy.phone = patchAcademyDto.phone ?? academy.phone;
        academy.website_url = patchAcademyDto.website_url ?? academy.website_url;
        academy.instagram_url =
            patchAcademyDto.instagram_url ?? academy.instagram_url;
        academy.maps_url = patchAcademyDto.maps_url ?? academy.maps_url;
        academy.image = patchAcademyDto.image ?? academy.image;
        academy.styles = styles;
        try {
            await this.academyRepository.save(academy);
        }
        catch {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database',
            });
        }
        return academy;
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
    __param(0, (0, typeorm_1.InjectRepository)(academy_entity_1.Academy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        comunas_service_1.ComunasService,
        styles_service_1.StylesService,
        pagination_provider_1.PaginationProvider])
], AcademiesService);
//# sourceMappingURL=academies.service.js.map