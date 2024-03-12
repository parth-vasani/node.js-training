import { MigrationInterface, QueryRunner } from "typeorm";

export class NEWUSER1709870828617 implements MigrationInterface {
    name = 'NEWUSER1709870828617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
    }

}
