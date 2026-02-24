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
exports.CreateAcademyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAcademyDto {
    name;
    location;
    website_url;
    instagram_url;
    maps_url;
    image;
    comuna_id;
    user_id;
}
exports.CreateAcademyDto = CreateAcademyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the academy name',
        example: 'Bsoul studio',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(512),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the academy location',
        example: 'Rosas 1234',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(1024),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'academy url page',
        example: 'http://localhost.com/images.cl',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "website_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Instagram url academy',
        example: 'http://localhost.com/images.cl',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "instagram_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is the academ map url location',
        example: 'http://localhost.com/images.cl',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(1024),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "maps_url", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(1024),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer', required: true, example: 79 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAcademyDto.prototype, "comuna_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'integer', required: true, example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAcademyDto.prototype, "user_id", void 0);
//# sourceMappingURL=create-academy.dto.js.map