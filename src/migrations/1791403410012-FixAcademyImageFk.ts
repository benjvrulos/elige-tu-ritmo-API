import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAcademyImageFk1791403410012 implements MigrationInterface {
    name = 'FixAcademyImageFk1791403410012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3"`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3"`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
