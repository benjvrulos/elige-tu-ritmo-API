import { ComunasService } from './providers/comunas.service';
export declare class ComunasController {
    private readonly comunasService;
    constructor(comunasService: ComunasService);
    findByRegion(regionId: string): Promise<import("./comuna.entity").Comuna[]>;
}
