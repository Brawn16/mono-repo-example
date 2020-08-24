import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOperativeTables1597423719888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "operative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "emergencyContactName" character varying NOT NULL, "emergencyContactPhoneNumber" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying, "addressLine3" character varying, "addressTownCity" character varying, "addressCounty" character varying, "addressPostcode" character varying NOT NULL, "medicalIssues" boolean NOT NULL, "medicalIssuesNotes" character varying, "medicationRequired" boolean NOT NULL, "medicationRequiredNotes" character varying, "qualificationUploadIds" character varying array NOT NULL, "workstreamId" uuid, "subcontractorId" uuid, "photoUploadId" uuid, CONSTRAINT "REL_a66711489bd98be3e89faaf2af" UNIQUE ("photoUploadId"), CONSTRAINT "PK_c6da4765ee047cc43789cca8339" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "operativeIdentification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uploads" character varying array NOT NULL, "operativeId" uuid, "identificationId" uuid, CONSTRAINT "PK_4b1deede5048aaebe22e7925014" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "identification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_fd49f15a74f96c6d17645c8810a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" ADD CONSTRAINT "FK_3e964295fe6460ba6a08aa622cb" FOREIGN KEY ("workstreamId") REFERENCES "workstream"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" ADD CONSTRAINT "FK_29f0e485ae58f8dcd8914c0473b" FOREIGN KEY ("subcontractorId") REFERENCES "subcontractor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" ADD CONSTRAINT "FK_a66711489bd98be3e89faaf2afe" FOREIGN KEY ("photoUploadId") REFERENCES "upload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "operativeIdentification" ADD CONSTRAINT "FK_0c97d9357b80679130c593b76dd" FOREIGN KEY ("operativeId") REFERENCES "operative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "operativeIdentification" ADD CONSTRAINT "FK_efc2264b28b2a8d1c928bbeeb49" FOREIGN KEY ("identificationId") REFERENCES "identification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operativeIdentification" DROP CONSTRAINT "FK_efc2264b28b2a8d1c928bbeeb49"`
    );
    await queryRunner.query(
      `ALTER TABLE "operativeIdentification" DROP CONSTRAINT "FK_0c97d9357b80679130c593b76dd"`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" DROP CONSTRAINT "FK_a66711489bd98be3e89faaf2afe"`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" DROP CONSTRAINT "FK_29f0e485ae58f8dcd8914c0473b"`
    );
    await queryRunner.query(
      `ALTER TABLE "operative" DROP CONSTRAINT "FK_3e964295fe6460ba6a08aa622cb"`
    );
    await queryRunner.query(`DROP TABLE "identification"`);
    await queryRunner.query(`DROP TABLE "operativeIdentification"`);
    await queryRunner.query(`DROP TABLE "operative"`);
  }
}
