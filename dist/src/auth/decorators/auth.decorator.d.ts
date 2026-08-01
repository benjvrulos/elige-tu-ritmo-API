import { AuthType } from '../enums/auth-type.enum';
export declare const Auth: (...authType: AuthType[]) => import("@nestjs/common").CustomDecorator<string>;
