import { Body, Injectable } from '@nestjs/common';
import { Academy } from '../academy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademyDto } from '../dtos/create-academy.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ComunasService } from 'src/comunas/providers/comunas.service';

@Injectable()
export class AcademiesService {
  constructor(
    /**
     * Inject Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Inject Comuna Service
     */
    private readonly comunaService: ComunasService,

    /**
     * Inject postsRepository
     */
    @InjectRepository(Academy)
    private readonly academyRepository: Repository<Academy>,
  ) {}

  /**
   * Creating new academies
   */

  public async findAll() {
    return await this.academyRepository.find();
  }
  public async create(@Body() createAcademyDto: CreateAcademyDto) {
    // Find user from database based on userId
    const user = await this.usersService.findOneById(createAcademyDto.user_id);
    const comuna = await this.comunaService.findOneById(
      createAcademyDto.comuna_id,
    );
    // Create post

    if (user && comuna) {
      const academy = this.academyRepository.create({
        ...createAcademyDto,
        user: user,
        comuna: comuna,
      });
      return await this.academyRepository.save(academy);
    }
  }

  public async findOneById(academy_id: number) {
    return await this.academyRepository.findOneBy({ academy_id });
  }
}
