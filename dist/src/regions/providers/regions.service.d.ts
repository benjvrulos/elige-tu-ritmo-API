import { Repository } from 'typeorm';
import { Region } from '../region.entity';
export declare class RegionsService {
    private readonly regionsRepository;
    constructor(regionsRepository: Repository<Region>);
    findAll(): Promise<Region[]>;
}
