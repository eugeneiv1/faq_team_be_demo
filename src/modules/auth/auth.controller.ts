import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AuthControllerDocStrings } from 'src/utils/constants/docsTexts';
import { ERouteNames } from 'src/entities/enums/route-names.enum';

@Controller(ERouteNames.AUTH_ROUTE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(ERouteNames.SIGNIN_ROUTE)
  @ApiOperation({ summary: AuthControllerDocStrings.operations.SIGNIN.summary })
  @ApiOkResponse({
    description: AuthControllerDocStrings.operations.SIGNIN.okResponse,
    type: UserDto,
  })
  @ApiInternalServerErrorResponse({
    description: AuthControllerDocStrings.operations.SIGNIN.errorResponse,
  })
  async login(@Request() req) {
    return this.authService.login(req.user as UserDto);
  }

  @Post(ERouteNames.SIGNUP_ROUTE)
  @ApiOperation({ summary: AuthControllerDocStrings.operations.SIGNUP.summary })
  @ApiOkResponse({
    description: AuthControllerDocStrings.operations.SIGNUP.okResponse,
    type: UserDto,
  })
  @ApiInternalServerErrorResponse({
    description: AuthControllerDocStrings.operations.SIGNUP.errorResponse,
  })
  async register(@Request() req) {
    return this.authService.register(req.body as LogDto);
  }
}
