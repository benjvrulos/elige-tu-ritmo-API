import { Academy } from '../academy.entity';
import { Repository } from 'typeorm';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';
import { StylesService } from 'src/styles/providers/styles.service';
export declare class AcademiesService {
    private readonly usersService;
    private readonly comunaService;
    private readonly stylesService;
    private readonly academyRepository;
    constructor(usersService: UsersService, comunaService: ComunasService, stylesService: StylesService, academyRepository: Repository<Academy>);
    findAll(): Promise<Academy[]>;
    create(createAcademyDto: CreateAcademyDto): Promise<Academy | undefined>;
    findOneById(academy_id: number): Promise<Academy | null>;
}
