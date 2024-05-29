import { ApiProperty } from '@nestjs/swagger';
import { testDtoProperties } from 'src/utils/constants/docsTexts';

export class TestDto {
  @ApiProperty(testDtoProperties.id)
  id: number;

  @ApiProperty(testDtoProperties.name)
  name: string;

  @ApiProperty(testDtoProperties.email)
  email: string;
}
