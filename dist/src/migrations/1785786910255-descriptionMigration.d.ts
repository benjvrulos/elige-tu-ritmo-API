import { MigrationInterface, QueryRunner } from "typeorm";
export declare class DescriptionMigration1785786910255 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
