import { AcademiesService } from './providers/academies.service';
import { CreateAcademyDto } from './dtos/create-academy.dto';
import { GetAcademiesDto } from './dtos/get-academies.dto';
import { type ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
export declare class AcademiesController {
    private readonly academyService;
    constructor(academyService: AcademiesService);
    getAcademies(postQuery: GetAcademiesDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./academy.entity").Academy>>;
    getAcademy(academyId: string): Promise<import("./academy.entity").Academy | null> | undefined;
    createAcademy(createAcademyDto: CreateAcademyDto, user: ActiveUserData): Promise<import("./academy.entity").Academy | undefined>;
}
