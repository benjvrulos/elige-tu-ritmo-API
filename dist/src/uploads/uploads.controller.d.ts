import { UploadsService } from './providers/uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFile(file: Express.Multer.File): Promise<import("./upload.entity").Upload>;
}
