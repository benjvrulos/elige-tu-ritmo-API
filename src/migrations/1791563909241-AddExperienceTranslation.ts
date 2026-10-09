import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExperienceTranslation1791563909241 implements MigrationInterface {
  name = 'AddExperienceTranslation1791563909241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "experience_translation" ("id" SERIAL NOT NULL, "experienceId" integer NOT NULL, "languageCode" character varying(5) NOT NULL, "name" character varying(150) NOT NULL, "slug" character varying(180) NOT NULL, "shortDescription" character varying(300) NOT NULL, "description" text NOT NULL, "included" text, "notIncluded" text, "requirements" text, "recommendations" text, CONSTRAINT "UQ_6284d2cede10f125bf0859875ce" UNIQUE ("experienceId", "languageCode"), CONSTRAINT "PK_a8cacaefdde481cde90b7ea64db" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "experience_translation" ADD CONSTRAINT "FK_d20e6bc59c40abdec9bf912879e" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "experience_translation" DROP CONSTRAINT "FK_d20e6bc59c40abdec9bf912879e"`,
    );
    await queryRunner.query(`DROP TABLE "experience_translation"`);
  }
}
