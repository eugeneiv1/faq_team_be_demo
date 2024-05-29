import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AUTH_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from 'src/utils/constants';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';

@Controller(AUTH_ROUTE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(SIGNIN_ROUTE)
  async login(@Request() req) {
    return this.authService.login(req.user as UserDto);
  }

  @Post(SIGNUP_ROUTE)
  async register(@Request() req) {
    return this.authService.register(req.body as LogDto);
  }
}
