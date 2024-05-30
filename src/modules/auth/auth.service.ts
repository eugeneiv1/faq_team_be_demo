import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';
import { AuthServiceErrors } from 'src/utils/constants/errorTexts';
import * as bcrypt from 'bcrypt';
import { AccesTokenDto } from 'src/modules/auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { ...result } = user;
        return result;
      }
      throw new UnauthorizedException(
        AuthServiceErrors.errors.INVALID_CREDENTIALS,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        AuthServiceErrors.errors.VALIDATION,
      );
    }
  }

  async login(user: UserDto): Promise<AccesTokenDto> {
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(AuthServiceErrors.errors.LOGIN);
    }
  }

  async register(user: LogDto): Promise<UserDto> {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      throw new InternalServerErrorException(AuthServiceErrors.errors.REGISTER);
    }
  }
}
