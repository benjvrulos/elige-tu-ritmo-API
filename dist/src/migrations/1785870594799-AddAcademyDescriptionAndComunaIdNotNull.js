"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAcademyDescriptionAndComunaIdNotNull1785870594799 = void 0;
class AddAcademyDescriptionAndComunaIdNotNull1785870594799 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "academy" ADD "description" character varying(1024) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "academy" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "academy" RENAME COLUMN "comunaComunaId" TO "comuna_id"`);
        await queryRunner.query(`ALTER TABLE "academy" ALTER COLUMN "comuna_id" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "academy" ALTER COLUMN "comuna_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academy" RENAME COLUMN "comuna_id" TO "comunaComunaId"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP COLUMN "description"`);
    }
}
exports.AddAcademyDescriptionAndComunaIdNotNull1785870594799 = AddAcademyDescriptionAndComunaIdNotNull1785870594799;
//# sourceMappingURL=1785870594799-AddAcademyDescriptionAndComunaIdNotNull.js.map