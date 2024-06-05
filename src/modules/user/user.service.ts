import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { EErrorMessage } from '../../common/enums/error-message.enum';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async isUserExist(userId: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new HttpException(
          EErrorMessage.USER_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
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

  public async isEmailUnique(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (user) {
        throw new HttpException(
          EErrorMessage.EMAIL_ALREADY_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }
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

  public async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<void> {
    try {
      const { password, ...dtoWithoutPassword } = updateUserDto;
      const user = await this.isUserExist(id);
      if (!user) {
        throw new HttpException(
          EErrorMessage.USER_NOT_EXIST,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (password) {
        const salt = +this.configService.get('SALT');
        const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
        user.password = hashedPassword;
      }
      await this.userRepository.update(id, dtoWithoutPassword);
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
}
