import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1755505222571 implements MigrationInterface {
    name = 'InitMigration1755505222571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" ADD "worldSituation" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "worldSituation"`);
    }

}
