import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExperiencePlaceTranslation1791735796020 implements MigrationInterface {
    name = 'AddExperiencePlaceTranslation1791735796020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience_place_translation" ("id" SERIAL NOT NULL, "experiencePlaceId" integer NOT NULL, "languageCode" character varying(5) NOT NULL, "title" character varying(150), "notes" text, CONSTRAINT "UQ_c5e175a85161a79543820634196" UNIQUE ("experiencePlaceId", "languageCode"), CONSTRAINT "PK_16f201b1032ff3f30b8b7e04033" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place_translation" ("id" SERIAL NOT NULL, "placeId" integer NOT NULL, "languageCode" character varying(5) NOT NULL, "name" character varying(150) NOT NULL, "shortDescription" character varying(300), "description" text, CONSTRAINT "UQ_7cb84c7ac850ea05dadfb9c8765" UNIQUE ("placeId", "languageCode"), CONSTRAINT "PK_7c47b8251cb0bb06651c6a0c363" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "experience_place_translation" ADD CONSTRAINT "FK_325eca66e60b1cdb0a5d846d92a" FOREIGN KEY ("experiencePlaceId") REFERENCES "experience_place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_translation" ADD CONSTRAINT "FK_eb68824f0aa9676830b418a4d99" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "place_translation" DROP CONSTRAINT "FK_eb68824f0aa9676830b418a4d99"`);
        await queryRunner.query(`ALTER TABLE "experience_place_translation" DROP CONSTRAINT "FK_325eca66e60b1cdb0a5d846d92a"`);
        await queryRunner.query(`DROP TABLE "place_translation"`);
        await queryRunner.query(`DROP TABLE "experience_place_translation"`);
    }

}
