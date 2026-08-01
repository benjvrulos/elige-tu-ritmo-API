import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
export declare class UploadsService {
    private readonly uploadToAwsProvider;
    private readonly configService;
    private readonly uploadRepository;
    constructor(uploadToAwsProvider: UploadToAwsProvider, configService: ConfigService, uploadRepository: Repository<Upload>);
    uploadFile(file: Express.Multer.File): Promise<Upload>;
}
