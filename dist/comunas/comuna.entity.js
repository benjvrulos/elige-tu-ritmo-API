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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comuna = void 0;
const academy_entity_1 = require("../academies/academy.entity");
const region_entity_1 = require("../regions/region.entity");
const typeorm_1 = require("typeorm");
let Comuna = class Comuna {
    comuna_id;
    name;
    region;
    academies;
};
exports.Comuna = Comuna;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comuna.prototype, "comuna_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comuna.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (region) => region.comuna),
    (0, typeorm_1.JoinColumn)({ name: 'region_id' }),
    __metadata("design:type", region_entity_1.Region)
], Comuna.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => academy_entity_1.Academy, (academy) => academy.comuna),
    __metadata("design:type", Array)
], Comuna.prototype, "academies", void 0);
exports.Comuna = Comuna = __decorate([
    (0, typeorm_1.Entity)()
], Comuna);
//# sourceMappingURL=comuna.entity.js.map