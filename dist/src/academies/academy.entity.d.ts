import { Comuna } from 'src/comunas/comuna.entity';
import { Style } from 'src/styles/style.entity';
import { Upload } from 'src/uploads/upload.entity';
import { User } from 'src/users/user.entity';
export declare class Academy {
    academy_id: number;
    comuna: Comuna;
    user: User;
    name: string;
    description: string;
    location: string;
    phone?: string;
    website_url?: string;
    instagram_url?: string;
    maps_url: string;
    image: Upload;
    styles: Style[];
}
