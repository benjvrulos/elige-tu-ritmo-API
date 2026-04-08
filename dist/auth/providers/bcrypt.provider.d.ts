import { HashingProvider } from './hashing.provider';
export declare class BcryptProvider implements HashingProvider {
    hashPassword(data: string | Buffer): Promise<string>;
    comparePassword(data: string | Buffer, encrypted: string): Promise<boolean>;
}
