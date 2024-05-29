import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AUTH_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from 'src/utils/constants';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@Controller(AUTH_ROUTE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(SIGNIN_ROUTE)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiOkResponse({ description: 'User signed in successfully', type: UserDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Request() req) {
    return this.authService.login(req.user as UserDto);
  }

  @Post(SIGNUP_ROUTE)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ description: 'User registered successfully', type: UserDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Request() req) {
    return this.authService.register(req.body as LogDto);
  }
}
