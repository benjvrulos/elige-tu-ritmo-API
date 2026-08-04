import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAcademyDescriptionAndComunaIdNotNull1785870594799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "academy" ADD "description" character varying(1024) NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "description" DROP DEFAULT`,
    );

    await queryRunner.query(
      `ALTER TABLE "academy" RENAME COLUMN "comunaComunaId" TO "comuna_id"`,
    );

    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "comuna_id" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "comuna_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "academy" RENAME COLUMN "comuna_id" TO "comunaComunaId"`,
    );
    await queryRunner.query(`ALTER TABLE "academy" DROP COLUMN "description"`);
  }
}
