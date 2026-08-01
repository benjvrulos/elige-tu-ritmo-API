import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';
import { StylesService } from 'src/styles/providers/styles.service';
import { Repository } from 'typeorm';
import { Academy } from '../academy.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
import { Upload } from 'src/uploads/upload.entity';
export declare class CreateAcademyProvider {
    private readonly academyRepository;
    private readonly usersService;
    private readonly comunaService;
    private readonly stylesService;
    constructor(academyRepository: Repository<Academy>, usersService: UsersService, comunaService: ComunasService, stylesService: StylesService);
    create(createAcademyDto: CreateAcademyDto, user: ActiveUserData, image: Upload): Promise<Academy | undefined>;
}
