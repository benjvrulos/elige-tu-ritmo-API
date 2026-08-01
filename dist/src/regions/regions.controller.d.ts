import { RegionsService } from './providers/regions.service';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    getAllRegions(): Promise<import("./region.entity").Region[]>;
}
