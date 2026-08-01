"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesModule = void 0;
const common_1 = require("@nestjs/common");
const styles_service_1 = require("./providers/styles.service");
const styles_controller_1 = require("./styles.controller");
const style_entity_1 = require("./style.entity");
const typeorm_1 = require("@nestjs/typeorm");
let StylesModule = class StylesModule {
};
exports.StylesModule = StylesModule;
exports.StylesModule = StylesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([style_entity_1.Style])],
        exports: [styles_service_1.StylesService],
        providers: [styles_service_1.StylesService],
        controllers: [styles_controller_1.StylesController],
    })
], StylesModule);
//# sourceMappingURL=styles.module.js.map