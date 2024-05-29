import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  /**
   * The name associated with the log entry.
   * @example "John Doe"
   */
  @ApiProperty({
    description: 'The name associated with the log entry.',
    example: 'John Doe',
  })
  name: string;

  /**
   * The email address associated with the log entry.
   * @example "john.doe@example.com"
   */
  @ApiProperty({
    description: 'The email address associated with the log entry.',
    example: 'john.doe@example.com',
  })
  email: string;

  /**
   * The password for the user account.
   * @example "$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu"
   */
  @ApiProperty({
    description: 'The password for the user account.',
    example: '$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu',
  })
  password: string;
}
