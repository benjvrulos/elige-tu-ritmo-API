"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComunasModule = void 0;
const common_1 = require("@nestjs/common");
const comuna_entity_1 = require("./comuna.entity");
const typeorm_1 = require("@nestjs/typeorm");
const comunas_service_1 = require("./providers/comunas.service");
let ComunasModule = class ComunasModule {
};
exports.ComunasModule = ComunasModule;
exports.ComunasModule = ComunasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([comuna_entity_1.Comuna])],
        providers: [comunas_service_1.ComunasService],
        exports: [comunas_service_1.ComunasService],
    })
], ComunasModule);
//# sourceMappingURL=comunas.module.js.map