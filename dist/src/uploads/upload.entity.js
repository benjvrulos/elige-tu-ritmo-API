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
exports.Upload = void 0;
const typeorm_1 = require("typeorm");
const file_types_enum_1 = require("./enums/file-types.enum");
let Upload = class Upload {
    id;
    name;
    path;
    type;
    mime;
    size;
    createDate;
    updateDate;
};
exports.Upload = Upload;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Upload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Upload.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1024, nullable: false }),
    __metadata("design:type", String)
], Upload.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: file_types_enum_1.fileTypes,
        default: file_types_enum_1.fileTypes.IMAGE,
        nullable: false,
    }),
    __metadata("design:type", String)
], Upload.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: false }),
    __metadata("design:type", String)
], Upload.prototype, "mime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Upload.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Upload.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Upload.prototype, "updateDate", void 0);
exports.Upload = Upload = __decorate([
    (0, typeorm_1.Entity)()
], Upload);
//# sourceMappingURL=upload.entity.js.map