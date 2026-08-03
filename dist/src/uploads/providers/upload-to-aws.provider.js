"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadToAwsProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const path = __importStar(require("path"));
const crypto_1 = require("crypto");
let UploadToAwsProvider = class UploadToAwsProvider {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async fileUpload(file) {
        const s3 = new aws_sdk_1.S3();
        try {
            const uploadResult = await s3
                .upload({
                Bucket: this.configService.get('appConfig.awsBucketName') ?? '',
                Body: file.buffer,
                Key: this.generateFileName(file),
                ContentType: file.mimetype,
            })
                .promise();
            return uploadResult.Key;
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error);
        }
    }
    generateFileName(file) {
        const name = file.originalname.split('.')[0];
        name.replace(/\s/g, '').trim();
        const extension = path.extname(file.originalname);
        const timeStamp = new Date().getTime().toString().trim();
        return `${name}-${timeStamp}-${(0, crypto_1.randomUUID)()}${extension}`;
    }
};
exports.UploadToAwsProvider = UploadToAwsProvider;
exports.UploadToAwsProvider = UploadToAwsProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadToAwsProvider);
//# sourceMappingURL=upload-to-aws.provider.js.map