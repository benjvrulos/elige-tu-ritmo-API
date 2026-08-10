import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAcademyUrlConstraints1785900000000 implements MigrationInterface {
  name = 'UpdateAcademyUrlConstraints1785900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "maps_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "instagram_url" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "instagram_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "academy" ALTER COLUMN "maps_url" SET NOT NULL`,
    );
  }
}
