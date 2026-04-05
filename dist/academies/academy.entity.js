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
exports.Academy = void 0;
const comuna_entity_1 = require("../comunas/comuna.entity");
const style_entity_1 = require("../styles/style.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Academy = class Academy {
    academy_id;
    comuna;
    user;
    name;
    location;
    phone;
    website_url;
    instagram_url;
    maps_url;
    image;
    styles;
};
exports.Academy = Academy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Academy.prototype, "academy_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comuna_entity_1.Comuna, (comuna) => comuna.academies),
    __metadata("design:type", comuna_entity_1.Comuna)
], Academy.prototype, "comuna", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.academies),
    __metadata("design:type", user_entity_1.User)
], Academy.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, nullable: false, unique: true }),
    __metadata("design:type", String)
], Academy.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 512, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "website_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "instagram_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "maps_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Academy.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => style_entity_1.Style, (style) => style.academies, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Academy.prototype, "styles", void 0);
exports.Academy = Academy = __decorate([
    (0, typeorm_1.Entity)()
], Academy);
//# sourceMappingURL=academy.entity.js.map