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
exports.StylesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const style_entity_1 = require("../style.entity");
const typeorm_2 = require("@nestjs/typeorm");
let StylesService = class StylesService {
    styleRepository;
    constructor(styleRepository) {
        this.styleRepository = styleRepository;
    }
    async create(createStyleDto) {
        const style = this.styleRepository.create(createStyleDto);
        return await this.styleRepository.save(style);
    }
    async findOneById(style_id) {
        return await this.styleRepository.findOneBy({ style_id });
    }
    async findMultipleStyles(styles) {
        return await this.styleRepository.find({ where: { style_id: (0, typeorm_1.In)(styles) } });
    }
};
exports.StylesService = StylesService;
exports.StylesService = StylesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(style_entity_1.Style)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StylesService);
//# sourceMappingURL=styles.service.js.map