import { AcademiesService } from './providers/academies.service';
import { CreateAcademyDto } from './dtos/create-academy.dto';
export declare class AcademiesController {
    private readonly academyService;
    constructor(academyService: AcademiesService);
    getAll(): Promise<import("./academy.entity").Academy[]>;
    getAcademy(academyId: string): Promise<import("./academy.entity").Academy | null> | undefined;
    createAcademy(createAcademyDto: CreateAcademyDto): Promise<import("./academy.entity").Academy | undefined>;
}
