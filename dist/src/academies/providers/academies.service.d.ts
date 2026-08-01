import { Academy } from '../academy.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { StylesService } from 'src/styles/providers/styles.service';
import { PatchAcademyDto } from '../dtos/update-academy.dto';
import { GetAcademiesDto } from '../dtos/get-academies.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateAcademyProvider } from './create-academy.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
import { UploadsService } from 'src/uploads/providers/uploads.service';
export declare class AcademiesService {
    private readonly academyRepository;
    private readonly stylesService;
    private readonly paginationProvider;
    private readonly createAcademyProvider;
    private readonly uploadsService;
    constructor(academyRepository: Repository<Academy>, stylesService: StylesService, paginationProvider: PaginationProvider, createAcademyProvider: CreateAcademyProvider, uploadsService: UploadsService);
    findAll(postQuery: GetAcademiesDto, options?: FindManyOptions<Academy>): Promise<Paginated<Academy>>;
    createAcademy(file: Express.Multer.File, createAcademyDto: CreateAcademyDto, user: ActiveUserData): Promise<Academy | undefined>;
    update(patchAcademyDto: PatchAcademyDto): Promise<Academy>;
    findOneById(academy_id: number): Promise<Academy | null>;
}
