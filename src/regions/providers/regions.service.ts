import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Region } from '../region.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionsRepository: Repository<Region>,
  ) {}

  public async findAll() {
    return await this.regionsRepository.find();
  }
}
