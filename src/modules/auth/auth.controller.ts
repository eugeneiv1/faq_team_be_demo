import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import {
  UserDto,
  AccesTokenDto,
  AuthReqDto,
} from 'src/modules/auth/dto/auth.dto';
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
  async login(@Request() { user }: AuthReqDto): Promise<AccesTokenDto> {
    return this.authService.login(user);
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
  async register(@Body() body: LogDto): Promise<UserDto> {
    return this.authService.register(body);
  }
}
