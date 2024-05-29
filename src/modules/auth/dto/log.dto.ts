import { ApiProperty } from '@nestjs/swagger';
import { AuthDtoConstants } from 'src/utils/constants/docsTexts';

export class LogDto {
  @ApiProperty({
    description: AuthDtoConstants.email.description,
    example: AuthDtoConstants.email.example,
  })
  email: string;

  @ApiProperty({
    description: AuthDtoConstants.password.description,
    example: AuthDtoConstants.password.example,
  })
  password: string;
}
