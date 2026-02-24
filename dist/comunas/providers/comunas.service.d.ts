import { Comuna } from '../comuna.entity';
import { Repository } from 'typeorm';
export declare class ComunasService {
    private readonly comunaRepository;
    constructor(comunaRepository: Repository<Comuna>);
    findOneById(comuna_id: number): Promise<Comuna | null>;
}
