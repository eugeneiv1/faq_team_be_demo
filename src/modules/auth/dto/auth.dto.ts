import { ApiProperty } from '@nestjs/swagger';
import { AuthDtoConstants } from 'src/utils/constants/docsTexts';

export class UserDto {
  @ApiProperty({
    description: AuthDtoConstants.id.description,
    example: AuthDtoConstants.id.example,
  })
  id: string;

  @ApiProperty({
    description: AuthDtoConstants.name.description,
    example: AuthDtoConstants.name.example,
  })
  name: string;

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
