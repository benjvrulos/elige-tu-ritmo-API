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
}
