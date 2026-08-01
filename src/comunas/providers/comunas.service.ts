import { Injectable } from '@nestjs/common';
import { Comuna } from '../comuna.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComunasService {
  constructor(
    @InjectRepository(Comuna)
    private readonly comunaRepository: Repository<Comuna>,
  ) {}

  public async findOneById(comuna_id: number) {
    return await this.comunaRepository.findOneBy({ comuna_id });
  }

  public async findAll() {
    return await this.comunaRepository.find();
  }

  public async findByRegion(regionId: number) {
    return await this.comunaRepository.find({
      where: { region: { region_id: regionId } },
      relations: ['region'],
    });
  }
}
