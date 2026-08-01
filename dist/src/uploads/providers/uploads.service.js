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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const upload_entity_1 = require("../upload.entity");
const typeorm_2 = require("@nestjs/typeorm");
const upload_to_aws_provider_1 = require("./upload-to-aws.provider");
const config_1 = require("@nestjs/config");
const file_types_enum_1 = require("../enums/file-types.enum");
let UploadsService = class UploadsService {
    uploadToAwsProvider;
    configService;
    uploadRepository;
    constructor(uploadToAwsProvider, configService, uploadRepository) {
        this.uploadToAwsProvider = uploadToAwsProvider;
        this.configService = configService;
        this.uploadRepository = uploadRepository;
    }
    async uploadFile(file) {
        if (!['image/gif', 'image/jpeg', 'image/png', 'image/png'].includes(file.mimetype)) {
            throw new common_1.BadRequestException('Mime type not supported');
        }
        try {
            const name = await this.uploadToAwsProvider.fileUpload(file);
            const uploadFile = {
                name,
                path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
                type: file_types_enum_1.fileTypes.IMAGE,
                mime: file.mimetype,
                size: file.size,
            };
            const upload = this.uploadRepository.create(uploadFile);
            return await this.uploadRepository.save(upload);
        }
        catch (error) {
            throw new common_1.ConflictException(error);
        }
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(upload_entity_1.Upload)),
    __metadata("design:paramtypes", [upload_to_aws_provider_1.UploadToAwsProvider,
        config_1.ConfigService,
        typeorm_1.Repository])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map