import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as randomize from 'randomatic';
import {
  AccesTokenDto,
  UserDto,
} from 'src/modules/auth/dto/response/sign-in.dto';
import {
  AuthServiceErrors,
  UsersServiceErrors,
} from 'src/utils/constants/errorTexts';

import { EMailTemplate } from '../mail/enums/mail-template.enum';
import { ESubjectName } from '../mail/enums/subject-name.enum';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../repository/services/user.repository';
import { UserService } from '../user/user.service';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,

    private readonly mailService: MailService,

    private jwtService: JwtService,
  ) {}

  public async signUp(dto: SignUpRequestDto) {
    try {
      await this.userService.isEmailUnique(dto.email);
      const salt = +this.configService.get('SALT');
      const hashedPassword = await bcrypt.hash(dto.password, salt);
      const otp = randomize('0', 6);
      await Promise.all([
        await this.userRepository.save(
          this.userRepository.create({
            ...dto,
            password: hashedPassword,
            otp_code: otp,
          }),
        ),
        await this.mailService.sendMail(
          dto.email,
          ESubjectName.VERIFY,
          EMailTemplate.VERIFY,
          { otp_code: otp, name: dto.full_name },
        ),
      ]);

      return { email: dto.email };
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

  async validateUser(email: string, password: string): Promise<UserDto> {
    console.log(email, password)
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, is_verified: true },
    });

    if (!user) {
      throw new NotFoundException(UsersServiceErrors.errors.NOT_FOUND(email));
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException(
      AuthServiceErrors.errors.INVALID_CREDENTIALS,
    );
  }

  async login(user: UserDto): Promise<AccesTokenDto> {
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        is_verified: user.is_verified,
      };
    } catch (error) {
      throw new InternalServerErrorException(AuthServiceErrors.errors.LOGIN, {
        cause: error,
      });
    }
  }
}
