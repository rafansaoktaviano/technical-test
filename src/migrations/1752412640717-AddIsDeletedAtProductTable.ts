import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsDeletedAtProductTable1752412640717 implements MigrationInterface {
    name = 'AddIsDeletedAtProductTable1752412640717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`products\`
            ADD \`deleted_at\` datetime NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`products\` DROP COLUMN \`deleted_at\`
        `);
    }

}
