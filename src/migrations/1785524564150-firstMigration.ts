import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1785524564150 implements MigrationInterface {
    name = 'FirstMigration1785524564150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("region_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8d766fc1d4d2e72ecd5f6567a02" UNIQUE ("name"), CONSTRAINT "PK_54bf2818af7cc627f2f81f091a6" PRIMARY KEY ("region_id"))`);
        await queryRunner.query(`CREATE TABLE "comuna" ("comuna_id" SERIAL NOT NULL, "name" character varying NOT NULL, "region_id" integer, CONSTRAINT "PK_206224a6bb3fe8b7cc91c59d0f5" PRIMARY KEY ("comuna_id"))`);
        await queryRunner.query(`CREATE TABLE "style" ("style_id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" character varying(1024) NOT NULL, CONSTRAINT "PK_fb9df2518eb4765d7a2eae9e9c5" PRIMARY KEY ("style_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."upload_type_enum" AS ENUM('image')`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "name" character varying(1024) NOT NULL, "path" character varying(1024) NOT NULL, "type" "public"."upload_type_enum" NOT NULL DEFAULT 'image', "mime" character varying(128) NOT NULL, "size" integer NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academy" ("academy_id" SERIAL NOT NULL, "name" character varying(512) NOT NULL, "location" character varying(1024) NOT NULL, "phone" character varying(512), "website_url" character varying(1024), "instagram_url" character varying(1024), "maps_url" character varying(1024) NOT NULL, "comunaComunaId" integer, "userId" integer, "imageId" integer, CONSTRAINT "UQ_4faf40a942048b039102f1c91cc" UNIQUE ("name"), CONSTRAINT "REL_360bfca1929d7a957a0bdf531a" UNIQUE ("imageId"), CONSTRAINT "PK_47a8d22be3f5018c8c2e3a10978" PRIMARY KEY ("academy_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(96) NOT NULL, "lastName" character varying(96), "email" character varying(96) NOT NULL, "password" character varying(96), "googleId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academy_styles_style" ("academyAcademyId" integer NOT NULL, "styleStyleId" integer NOT NULL, CONSTRAINT "PK_000501aeb1767f82b536d55704f" PRIMARY KEY ("academyAcademyId", "styleStyleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0dfe421d98787b5ae6d095835" ON "academy_styles_style" ("academyAcademyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a82ba25b67475bb08dbadb48aa" ON "academy_styles_style" ("styleStyleId") `);
        await queryRunner.query(`ALTER TABLE "comuna" ADD CONSTRAINT "FK_02ddfea25e561b3123813121795" FOREIGN KEY ("region_id") REFERENCES "region"("region_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_8703ae4e212ea7624dd5fd4e4f3" FOREIGN KEY ("comunaComunaId") REFERENCES "comuna"("comuna_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_c7531a69485827f4de525bb5923" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy_styles_style" ADD CONSTRAINT "FK_f0dfe421d98787b5ae6d0958353" FOREIGN KEY ("academyAcademyId") REFERENCES "academy"("academy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "academy_styles_style" ADD CONSTRAINT "FK_a82ba25b67475bb08dbadb48aa5" FOREIGN KEY ("styleStyleId") REFERENCES "style"("style_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academy_styles_style" DROP CONSTRAINT "FK_a82ba25b67475bb08dbadb48aa5"`);
        await queryRunner.query(`ALTER TABLE "academy_styles_style" DROP CONSTRAINT "FK_f0dfe421d98787b5ae6d0958353"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_c7531a69485827f4de525bb5923"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_8703ae4e212ea7624dd5fd4e4f3"`);
        await queryRunner.query(`ALTER TABLE "comuna" DROP CONSTRAINT "FK_02ddfea25e561b3123813121795"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a82ba25b67475bb08dbadb48aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0dfe421d98787b5ae6d095835"`);
        await queryRunner.query(`DROP TABLE "academy_styles_style"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "academy"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TYPE "public"."upload_type_enum"`);
        await queryRunner.query(`DROP TABLE "style"`);
        await queryRunner.query(`DROP TABLE "comuna"`);
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
