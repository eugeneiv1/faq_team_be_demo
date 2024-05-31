import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ERouteName } from '../../common/enums/route-name.enum';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';

@ApiTags('Authorization')
@Controller(ERouteName.AUTH_ROUTE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  @Post(ERouteName.SIGNUP_ROUTE)
  public async signUp(@Body() dto: SignUpRequestDto): Promise<void> {
    return await this.authService.signUp(dto);
  }
}
