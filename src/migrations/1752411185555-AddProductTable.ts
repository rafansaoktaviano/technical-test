import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTable1752411185555 implements MigrationInterface {
    name = 'AddProductTable1752411185555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`products\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`price\` int NOT NULL,
                \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`stock\` int NOT NULL,
                \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`products\`
        `);
    }

}
