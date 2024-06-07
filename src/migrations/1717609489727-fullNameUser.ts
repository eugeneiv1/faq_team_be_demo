import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullNameUser1717609489727 implements MigrationInterface {
  name = 'FullNameUser1717609489727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`user_name\` \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`full_name\` \`user_name\` varchar(255) NOT NULL`,
    );
  }
}
