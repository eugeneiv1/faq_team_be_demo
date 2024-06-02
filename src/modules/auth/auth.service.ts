import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repository/services/user.repository';
import { UserService } from '../user/user.service';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(dto: SignUpRequestDto): Promise<void> {
    try {
      await this.userService.isEmailUnique(dto.email);

      const salt = +this.configService.get('SALT');
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      await this.userRepository.save(
        this.userRepository.create({ ...dto, password: hashedPassword }),
      );
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.BAD_REQUEST
      ) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async testGoogle() {}
}
