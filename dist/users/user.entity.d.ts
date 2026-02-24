import { Academy } from 'src/academies/academy.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    academies: Academy[];
}
