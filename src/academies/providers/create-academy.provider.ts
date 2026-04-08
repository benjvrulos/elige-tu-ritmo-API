import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';
import { StylesService } from 'src/styles/providers/styles.service';
import { Style } from 'src/styles/style.entity';
import { Repository } from 'typeorm';
import { Academy } from '../academy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interfaces';
import { User } from 'src/users/user.entity';
import { Comuna } from 'src/comunas/comuna.entity';

@Injectable()
export class CreateAcademyProvider {
  constructor(
    /**
     * Inject Acdemy Repository
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
  ) {}

  public async create(
    createAcademyDto: CreateAcademyDto,
    user: ActiveUserData,
  ) {
    let creator: User | null = null;
    let comuna: Comuna | null = null;
    let styles: Style[] = [];
    try {
      // Find user from database based on userId
      creator = await this.usersService.findOneById(user.sub);

      comuna = await this.comunaService.findOneById(createAcademyDto.comuna_id);

      // Find styles from database

      if (createAcademyDto.style_ids) {
        styles = await this.stylesService.findMultipleStyles(
          createAcademyDto.style_ids,
        );
      }
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createAcademyDto.style_ids.length !== styles.length) {
      throw new BadRequestException('Please check your style ids');
    }

    if (comuna && styles) {
      const academy = this.academyRepository.create({
        ...createAcademyDto,
        user: creator,
        comuna,
        styles,
      });

      try {
        return await this.academyRepository.save(academy);
      } catch (error) {
        throw new ConflictException(error, {
          description: 'Ensure academy name is unique a not a duplicate',
        });
      }
    }
  }
}
