import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EErrorMessage } from '../../common/enums/error-message.enum';
import { UserRepository } from '../repository/services/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async isUserExist(userId: string) {
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
}
