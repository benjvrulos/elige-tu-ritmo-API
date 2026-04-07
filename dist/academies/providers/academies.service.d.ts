import { Academy } from '../academy.entity';
import { Repository } from 'typeorm';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';
import { StylesService } from 'src/styles/providers/styles.service';
import { PatchAcademyDto } from '../dtos/update-academy.dto';
import { GetAcademiesDto } from '../dtos/get-academies.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
export declare class AcademiesService {
    private readonly academyRepository;
    private readonly usersService;
    private readonly comunaService;
    private readonly stylesService;
    private readonly paginationProvider;
    constructor(academyRepository: Repository<Academy>, usersService: UsersService, comunaService: ComunasService, stylesService: StylesService, paginationProvider: PaginationProvider);
    findAll(postQuery: GetAcademiesDto): Promise<Paginated<Academy>>;
    create(createAcademyDto: CreateAcademyDto): Promise<Academy | undefined>;
    update(patchAcademyDto: PatchAcademyDto): Promise<Academy>;
    findOneById(academy_id: number): Promise<Academy | null>;
}
