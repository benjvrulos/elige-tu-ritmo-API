import { ConfigService } from '@nestjs/config';
export declare class UploadToAwsProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    fileUpload(file: Express.Multer.File): Promise<string>;
    private generateFileName;
}
