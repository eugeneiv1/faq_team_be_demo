import { ApiProperty } from '@nestjs/swagger';

export class TestDto {
  @ApiProperty({
    example: 'Example id',
    description: 'The id of the test object',
  })
  id: number;

  @ApiProperty({
    example: 'Example name',
    description: 'The name of the test object',
  })
  name: string;

  @ApiProperty({
    example: 'Example email',
    description: 'The email of the test object',
  })
  email: string;
}
