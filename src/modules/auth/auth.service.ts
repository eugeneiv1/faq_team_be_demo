import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';

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
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while validating user',
      );
    }
  }

  async login(user: UserDto) {
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while logging in',
      );
    }
  }

  async register(user: LogDto) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = { ...user, password: hashedPassword };
      return await this.usersService.create(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while registering user',
      );
    }
  }
}
