import { Comuna } from 'src/comunas/comuna.entity';
import { User } from 'src/users/user.entity';
export declare class Academy {
    academy_id: number;
    comuna: Comuna;
    user: User;
    name: string;
    location: string;
    website_url: string;
    instagram_url: string;
    maps_url: string;
    image: string;
}
