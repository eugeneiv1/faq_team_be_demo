import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as randomize from 'randomatic';

import { EErrorMessage } from '../../common/enums/error-message.enum';
import { UserEntity } from '../../entities/user.entity';
import { EMailTemplate } from '../mail/enums/mail-template.enum';
import { ESubjectName } from '../mail/enums/subject-name.enum';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

  public async updateUser(updateUserDto: UpdateUserDto): Promise<void> {
    try {
      const { password, ...dtoWithoutPassword } = updateUserDto;
      const user = await this.userRepository.findOne({
        where: {
          email: updateUserDto.email,
        },
        select: { password: true, email: true },
      });

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

      await this.userRepository.update(
        { email: user.email },
        { ...dtoWithoutPassword, password: user.password },
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

  public async updateUserById(updateUserDto: UpdateUserDto, id: string): Promise<void> {
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

      await this.userRepository.update(
          id,
          { ...dtoWithoutPassword, password: user.password},
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

  async getUser(token) {
    const payload = this.jwtService.verify(token, { secret: 'bestJwtSecret' });
    const user = await this.isUserExist(payload.user_id);
    return {
      email: user.email,
      full_name: user.full_name,
      user_id: user.id,
    };
  }

  async sendOtp(email) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    const otp = randomize('0', 6);

    await Promise.all([
      await this.userRepository.save(
        this.userRepository.create({ ...user, otp_code: otp }),
      ),
      await this.mailService.sendMail(
        user.email,
        ESubjectName.VERIFY,
        EMailTemplate.VERIFY,
        { otp_code: otp, name: user.full_name },
      ),
    ]);
  }

  public async verifyOtp(email, otp_code) {
    console.log(email, otp_code)
    const user = await this.userRepository.findOneBy({ email });
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('User doesnt exist');
    }
    await this.userRepository.save({ ...user, is_verified: false });
    if (user.otp_code !== otp_code) {
      console.log('dfg')
      throw new UnauthorizedException('otp code is incorrect');
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      is_verified: true,
    });

    return { is_verified: !!updatedUser.is_verified };
  }
}
