import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register new user' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpRequestDto) {
    return await this.authService.signUp(dto);
  }
}
