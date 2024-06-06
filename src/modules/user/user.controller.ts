import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';

import { UserService } from './user.service';

@ApiTags('User')
@Controller(ERouteName.USERS_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async getUserById(@Body() dto) {
    return await this.userService.getUser(dto.token);
  }

  @Post('/user/send-otp')
  async restorePassword(@Body() dto) {
    return await this.userService.sendOtp(dto.email);
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() dto) {
    return await this.userService.verifyOtp(dto.email, dto.otp_code);
  }
  @Post('/set-new-pass')
  async setNewPass(@Body() dto) {
    return await this.userService.updateUser(dto);
  }

  // @Patch(ERouteName.USER_UPDATEBYID_ROUTE)
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<{ message: string }> {
  //   await this.userService.updateUser(updateUserDto, id);
  //   return { message: 'user updated successfully' };
  // }
}
