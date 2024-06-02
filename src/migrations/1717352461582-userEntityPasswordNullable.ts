import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntityPasswordNullable1717352461582
  implements MigrationInterface
{
  name = 'UserEntityPasswordNullable1717352461582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_name\` varchar(255) NOT NULL`,
    );
  }
}
