import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
