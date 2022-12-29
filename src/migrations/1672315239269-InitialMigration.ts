import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1672315239269 implements MigrationInterface {
    name = 'InitialMigration1672315239269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`awards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` enum ('VOUCHERS', 'PRODUCTS') NOT NULL DEFAULT 'VOUCHERS', \`point\` int NOT NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`awards\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
