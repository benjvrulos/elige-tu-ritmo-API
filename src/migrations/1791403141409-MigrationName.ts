import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1791403141409 implements MigrationInterface {
    name = 'MigrationName1791403141409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_8703ae4e212ea7624dd5fd4e4f3"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3"`);
        await queryRunner.query(`CREATE TABLE "experience_place" ("id" SERIAL NOT NULL, "experienceId" integer NOT NULL, "placeId" integer NOT NULL, "position" integer NOT NULL, "startOffsetMinutes" integer, "durationMinutes" integer, "title" character varying(150), "notes" text, CONSTRAINT "PK_858a57c544410ed9933367cb576" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience_style" ("id" SERIAL NOT NULL, "experienceId" integer NOT NULL, "styleId" integer NOT NULL, CONSTRAINT "PK_d029cae88571e316d415e4c8ed8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience_academy" ("id" SERIAL NOT NULL, "experienceId" integer NOT NULL, "academyId" integer NOT NULL, "position" integer, "durationMinutes" integer, "notes" text, CONSTRAINT "PK_75c7ef314a49c79b2b9ee3b19bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking_participant" ("id" SERIAL NOT NULL, "bookingId" integer NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100), "nationality" character varying(100), "email" character varying(150), "phone" character varying(50), "notes" text, CONSTRAINT "PK_2f6dc97ee4af4bd42482d9a8483" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_provider_enum" AS ENUM('WEBPAY', 'STRIPE', 'PAYPAL', 'MANUAL')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "bookingId" integer NOT NULL, "provider" "public"."payment_provider_enum" NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'PENDING', "amount" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "providerPaymentId" character varying(255), "transactionId" character varying(255), "paymentMethod" character varying(100), "paidAt" TIMESTAMP WITH TIME ZONE, "refundedAmount" numeric(10,2) NOT NULL DEFAULT '0', "refundedAt" TIMESTAMP WITH TIME ZONE, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_paymentstatus_enum" AS ENUM('PENDING', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "bookingCode" character varying(30) NOT NULL, "scheduleId" integer NOT NULL, "userId" integer, "contactName" character varying(150) NOT NULL, "contactEmail" character varying(150) NOT NULL, "contactPhone" character varying(50), "peopleCount" integer NOT NULL, "subtotal" numeric(10,2) NOT NULL, "discountAmount" numeric(10,2) NOT NULL DEFAULT '0', "totalAmount" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "status" "public"."booking_status_enum" NOT NULL DEFAULT 'PENDING', "paymentStatus" "public"."booking_paymentstatus_enum" NOT NULL DEFAULT 'PENDING', "specialRequests" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eb14bff781dc5580a532803a7ba" UNIQUE ("bookingCode"), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."experience_schedule_status_enum" AS ENUM('AVAILABLE', 'FULL', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "experience_schedule" ("id" SERIAL NOT NULL, "experienceId" integer NOT NULL, "startDateTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endDateTime" TIMESTAMP WITH TIME ZONE NOT NULL, "capacity" integer NOT NULL, "status" "public"."experience_schedule_status_enum" NOT NULL DEFAULT 'AVAILABLE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f931e4e6a2e730b17eab2307c10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."experience_type_enum" AS ENUM('DAY_TOUR', 'CULTURAL', 'DANCE_CLASS', 'NIGHTLIFE', 'FULL_DAY', 'PRIVATE')`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "coverImageId" integer, "name" character varying(150) NOT NULL, "slug" character varying(180) NOT NULL, "shortDescription" character varying(300) NOT NULL, "description" text NOT NULL, "type" "public"."experience_type_enum" NOT NULL, "durationMinutes" integer NOT NULL, "minPeople" integer NOT NULL DEFAULT '1', "maxPeople" integer NOT NULL, "price" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "meetingPoint" character varying(255), "meetingLatitude" numeric(10,7), "meetingLongitude" numeric(10,7), "included" text, "notIncluded" text, "requirements" text, "recommendations" text, "isPrivateAvailable" boolean NOT NULL DEFAULT false, "isFeatured" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_46ee360a356c8dbd9a10176117f" UNIQUE ("slug"), CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."place_type_enum" AS ENUM('HISTORICAL', 'MUSEUM', 'PARK', 'NEIGHBORHOOD', 'MARKET', 'RESTAURANT', 'BAR', 'SALSA_CLUB', 'CULTURAL', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "comunaId" integer, "imageId" integer, "name" character varying(150) NOT NULL, "slug" character varying(180) NOT NULL, "shortDescription" character varying(300), "description" text, "type" "public"."place_type_enum" NOT NULL DEFAULT 'OTHER', "address" character varying(255), "latitude" numeric(10,7), "longitude" numeric(10,7), "mapsUrl" character varying(1024), "websiteUrl" character varying(1024), "instagramUrl" character varying(1024), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1443badb6c7af8994264958b4d3" UNIQUE ("slug"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "style" ADD "slug" character varying`);
        await queryRunner.query(`ALTER TABLE "style" ADD CONSTRAINT "UQ_67a7bd2423240a88e13e4fb248b" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "style" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "upload" ADD "altText" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nationality" character varying(96)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "preferredLanguage" character varying(96)`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'CUSTOMER', 'ACADEMY_OWNER', 'GUIDE')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'CUSTOMER'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_c7531a69485827f4de525bb5923"`);
        await queryRunner.query(`ALTER TABLE "academy" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experience_place" ADD CONSTRAINT "FK_40c5cb86791b4cceab7fa23542b" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_place" ADD CONSTRAINT "FK_6d6d11b56a3b76df36b8218ca52" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_style" ADD CONSTRAINT "FK_7ba68f5a0433be2ce857136c1bb" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_style" ADD CONSTRAINT "FK_451c74f0487d053c7d849c26b6c" FOREIGN KEY ("styleId") REFERENCES "style"("style_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_academy" ADD CONSTRAINT "FK_33774a896bc626388fa81c73260" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_academy" ADD CONSTRAINT "FK_202e7bd5d9d9b39b68c16594112" FOREIGN KEY ("academyId") REFERENCES "academy"("academy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking_participant" ADD CONSTRAINT "FK_724c69d65372868cf1adb5b4e9a" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_5738278c92c15e1ec9d27e3a098" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_2427b072768ad4b322d58a952d2" FOREIGN KEY ("scheduleId") REFERENCES "experience_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_schedule" ADD CONSTRAINT "FK_30000b76f1b205068f2eafdfa5a" FOREIGN KEY ("experienceId") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_38d2e1bbc05a4daa6f405bbbddc" FOREIGN KEY ("coverImageId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_88435ae67c0c80f8a20c0d26344" FOREIGN KEY ("comunaId") REFERENCES "comuna"("comuna_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_34f50b562fb988d9aa1ca239f40" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_e0ce5c7cbfa5f50223ca3cb6f17" FOREIGN KEY ("comuna_id") REFERENCES "comuna"("comuna_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_c7531a69485827f4de525bb5923" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_c7531a69485827f4de525bb5923"`);
        await queryRunner.query(`ALTER TABLE "academy" DROP CONSTRAINT "FK_e0ce5c7cbfa5f50223ca3cb6f17"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_34f50b562fb988d9aa1ca239f40"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_88435ae67c0c80f8a20c0d26344"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_38d2e1bbc05a4daa6f405bbbddc"`);
        await queryRunner.query(`ALTER TABLE "experience_schedule" DROP CONSTRAINT "FK_30000b76f1b205068f2eafdfa5a"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_2427b072768ad4b322d58a952d2"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_5738278c92c15e1ec9d27e3a098"`);
        await queryRunner.query(`ALTER TABLE "booking_participant" DROP CONSTRAINT "FK_724c69d65372868cf1adb5b4e9a"`);
        await queryRunner.query(`ALTER TABLE "experience_academy" DROP CONSTRAINT "FK_202e7bd5d9d9b39b68c16594112"`);
        await queryRunner.query(`ALTER TABLE "experience_academy" DROP CONSTRAINT "FK_33774a896bc626388fa81c73260"`);
        await queryRunner.query(`ALTER TABLE "experience_style" DROP CONSTRAINT "FK_451c74f0487d053c7d849c26b6c"`);
        await queryRunner.query(`ALTER TABLE "experience_style" DROP CONSTRAINT "FK_7ba68f5a0433be2ce857136c1bb"`);
        await queryRunner.query(`ALTER TABLE "experience_place" DROP CONSTRAINT "FK_6d6d11b56a3b76df36b8218ca52"`);
        await queryRunner.query(`ALTER TABLE "experience_place" DROP CONSTRAINT "FK_40c5cb86791b4cceab7fa23542b"`);
        await queryRunner.query(`ALTER TABLE "academy" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_c7531a69485827f4de525bb5923" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preferredLanguage"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nationality"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "upload" DROP COLUMN "altText"`);
        await queryRunner.query(`ALTER TABLE "style" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "style" DROP CONSTRAINT "UQ_67a7bd2423240a88e13e4fb248b"`);
        await queryRunner.query(`ALTER TABLE "style" DROP COLUMN "slug"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TYPE "public"."place_type_enum"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TYPE "public"."experience_type_enum"`);
        await queryRunner.query(`DROP TABLE "experience_schedule"`);
        await queryRunner.query(`DROP TYPE "public"."experience_schedule_status_enum"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_paymentstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_provider_enum"`);
        await queryRunner.query(`DROP TABLE "booking_participant"`);
        await queryRunner.query(`DROP TABLE "experience_academy"`);
        await queryRunner.query(`DROP TABLE "experience_style"`);
        await queryRunner.query(`DROP TABLE "experience_place"`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_360bfca1929d7a957a0bdf531a3" FOREIGN KEY ("imageId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "academy" ADD CONSTRAINT "FK_8703ae4e212ea7624dd5fd4e4f3" FOREIGN KEY ("comuna_id") REFERENCES "comuna"("comuna_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
