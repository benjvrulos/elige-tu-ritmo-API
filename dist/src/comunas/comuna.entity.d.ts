import { Academy } from 'src/academies/academy.entity';
import { Region } from 'src/regions/region.entity';
export declare class Comuna {
    comuna_id: number;
    name: string;
    region: Region;
    academies: Academy[];
}
