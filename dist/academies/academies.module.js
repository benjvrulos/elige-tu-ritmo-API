"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademiesModule = void 0;
const common_1 = require("@nestjs/common");
const academies_controller_1 = require("./academies.controller");
const academy_entity_1 = require("./academy.entity");
const typeorm_1 = require("@nestjs/typeorm");
const academies_service_1 = require("./providers/academies.service");
const users_module_1 = require("../users/users.module");
const comunas_module_1 = require("../comunas/comunas.module");
const styles_module_1 = require("../styles/styles.module");
const pagination_module_1 = require("../common/pagination/pagination.module");
const create_academy_provider_1 = require("./providers/create-academy.provider");
let AcademiesModule = class AcademiesModule {
};
exports.AcademiesModule = AcademiesModule;
exports.AcademiesModule = AcademiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [academies_controller_1.AcademiesController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([academy_entity_1.Academy]),
            users_module_1.UsersModule,
            comunas_module_1.ComunasModule,
            styles_module_1.StylesModule,
            pagination_module_1.PaginationModule,
        ],
        providers: [academies_service_1.AcademiesService, create_academy_provider_1.CreateAcademyProvider],
    })
], AcademiesModule);
//# sourceMappingURL=academies.module.js.map