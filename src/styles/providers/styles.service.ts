import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Style } from '../style.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStyleDto } from '../dtos/create-style.dto';

@Injectable()
export class StylesService {
  constructor(
    /** Injecting Style repository*/
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
  ) {}

  public async create(createStyleDto: CreateStyleDto) {
    const style = this.styleRepository.create(createStyleDto);
    return await this.styleRepository.save(style);
  }

  public async findOneById(style_id: number) {
    return await this.styleRepository.findOneBy({ style_id });
  }

  public async findMultipleStyles(styles: number[]) {
    return await this.styleRepository.find({ where: { style_id: In(styles) } });
  }
}
