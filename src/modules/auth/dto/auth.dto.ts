import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  /**
   * The unique identifier of the user.
   * @example 1
   */
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  })
  id: string;

  /**
   * The name of the user.
   * @example "John Doe"
   */
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  /**
   * The email address of the user.
   * @example "john.doe@example.com"
   */
  @ApiProperty({
    description: 'The email address of the user.',
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
