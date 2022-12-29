import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertDummyData1672327667597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`users\` (\`email\`) VALUES ('cinta@member.id'), ('rindu@member.id');`);
        await queryRunner.query(`INSERT INTO \`awards\` (\`name\`, \`type\`, \`point\`, \`image\`) VALUES ('Gift Card IDR 1.000.000', 'VOUCHERS', 500000, 'voucher1.jpg'),
        ('Gift Card IDR 500.000', 'VOUCHERS', 250000, 'voucher2.jpg'),
        ('Old Fashion Cake', 'PRODUCTS', 100000, 'product1.jpg'),
        ('Voucher Pulsa 20.000', 'VOUCHERS', 10000, 'voucher3.jpg'),
        ('Old Fashion Cake', 'PRODUCTS', 200000, 'product2.jpg');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRANCATE TABLE \`awards\``);
        await queryRunner.query(`TRANCATE TABLE \`users\``);
    }

}
