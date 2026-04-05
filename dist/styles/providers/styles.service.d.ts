import { Repository } from 'typeorm';
import { Style } from '../style.entity';
import { CreateStyleDto } from '../dtos/create-style.dto';
export declare class StylesService {
    private readonly styleRepository;
    constructor(styleRepository: Repository<Style>);
    create(createStyleDto: CreateStyleDto): Promise<Style>;
    findOneById(style_id: number): Promise<Style | null>;
    findMultipleStyles(styles: number[]): Promise<Style[]>;
}
