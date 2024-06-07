import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserRoleEntityType1717663020390
  implements MigrationInterface
{
  name = 'ChangeUserRoleEntityType1717663020390';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_role\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_role\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_role\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_role\` enum ('buyer', 'vendor') NULL`,
    );
  }
}
