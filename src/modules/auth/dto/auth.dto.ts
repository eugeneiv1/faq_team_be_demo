import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: '$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu',
  })
  password: string;
}

export class AuthReqDto {
  @ApiProperty({
    description: 'The password for the user account.',
    example: '$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu',
  })
  user: UserDto;
}

export class AccesTokenDto {
  @ApiProperty({
    description: 'The access token a user receives to the client',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ',
  })
  access_token: string;
}
