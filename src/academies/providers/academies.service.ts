import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Academy } from '../academy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';
import { Style } from 'src/styles/style.entity';
import { StylesService } from 'src/styles/providers/styles.service';
import { PatchAcademyDto } from '../dtos/update-academy.dto';
import { GetAcademiesDto } from '../dtos/get-academies.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class AcademiesService {
  constructor(
    /**
     * Inject AcademyRepository
     */
    @InjectRepository(Academy)
    private readonly academyRepository: Repository<Academy>,

    /**
     * Inject Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Inject Comuna Service
     */
    private readonly comunaService: ComunasService,

    /**
     * Inject Style Service
     */

    private readonly stylesService: StylesService,

    /**
     * Injecting Pagination Provider
     */

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async findAll(
    postQuery: GetAcademiesDto,
  ): Promise<Paginated<Academy>> {
    const academies = await this.paginationProvider.paginateQuery(
      { limit: postQuery.limit, page: postQuery.page },
      this.academyRepository,
    );
    return academies;
  }

  /**
   * Creating new academies
   */
  public async create(@Body() createAcademyDto: CreateAcademyDto) {
    // Find user from database based on userId
    const user = await this.usersService.findOneById(createAcademyDto.user_id);
    const comuna = await this.comunaService.findOneById(
      createAcademyDto.comuna_id,
    );

    // Find styles from database
    let styles: Style[] = [];

    if (createAcademyDto.style_ids) {
      styles = await this.stylesService.findMultipleStyles(
        createAcademyDto.style_ids,
      );
    }

    if (user && comuna && styles) {
      const academy = this.academyRepository.create({
        ...createAcademyDto,
        user,
        comuna,
        styles,
      });
      return await this.academyRepository.save(academy);
    }
  }

  public async update(patchAcademyDto: PatchAcademyDto) {
    let styles: Style[] | [] = [];
    let academy: Academy | null = null;

    // Find the Tags
    try {
      if (patchAcademyDto.style_ids) {
        styles = await this.stylesService.findMultipleStyles(
          patchAcademyDto?.style_ids,
        );
      }
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    /**
     * If styles were not found
     * Need to be equal number of styles
     */
    if (!styles || styles.length !== patchAcademyDto.style_ids?.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }

    // Find the Academy
    try {
      // Returns null if the academy does not exist
      academy = await this.academyRepository.findOneBy({
        academy_id: patchAcademyDto.id,
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!academy) {
      throw new BadRequestException('The academy Id does not exist');
    }

    // Update the properties
    academy.name = patchAcademyDto.name ?? academy.name;
    academy.location = patchAcademyDto.location ?? academy.location;
    academy.phone = patchAcademyDto.phone ?? academy.phone;
    academy.website_url = patchAcademyDto.website_url ?? academy.website_url;
    academy.instagram_url =
      patchAcademyDto.instagram_url ?? academy.instagram_url;
    academy.maps_url = patchAcademyDto.maps_url ?? academy.maps_url;
    academy.image = patchAcademyDto.image ?? academy.image;

    // Assign the new styles
    academy.styles = styles;

    // Save the academy and return
    try {
      await this.academyRepository.save(academy);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return academy;
  }

  public async findOneById(academy_id: number) {
    return await this.academyRepository.findOneBy({ academy_id });
  }
}
