import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AUTH_ROUTE, SIGNIN_ROUTE } from 'src/utils/constants';

@Controller(AUTH_ROUTE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(SIGNIN_ROUTE)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
