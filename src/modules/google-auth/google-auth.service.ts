import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../repository/services/user.repository';
import { EGoogLeAuthAction } from './enums/google-auth-action.enum';
import { IGoogleAuth } from './interfaces/google.interfaces';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async googleLogin(req: IGoogleAuth, res: Response) {
    let accessToken: string;
    let user: UserEntity;
    let authInfo = EGoogLeAuthAction.SIGNIN;

    const tokenSecret = this.configService.get('JWT_SECRET');
    const tokenExpires = this.configService.get('JWT_EXPIRES');

    try {
      const { email, firstName, lastName } = req.user;
      const isEmailExist = await this.userRepository.findOneBy({ email });
      const isUser = await this.userRepository.findOneBy({ email });

      if (!isEmailExist) {
        user = await this.userRepository.save(
          this.userRepository.create({
            full_name: `${firstName} ${lastName}`,
            email,
            is_verified: true,
          }),
        );

        authInfo = EGoogLeAuthAction.SIGNUP;
        accessToken = this.jwtService.sign(
          {
            email: user.email,
            user_id: user.id,
          },
          { secret: tokenSecret, expiresIn: tokenExpires },
        );
        console.log(accessToken);
        return { accessToken, authInfo };
      }

      accessToken = this.jwtService.sign(
        {
          email: isEmailExist.email,
          user_id: isEmailExist.id,
        },
        { secret: tokenSecret, expiresIn: tokenExpires },
      );

      await this.userRepository.update(isUser.email, {
        full_name: isUser.full_name,
      });

      res.cookie('access_token', accessToken, {
        maxAge: 2592000000, // 30 days in milliseconds
        sameSite: true,
        secure: false, // Set to true if using HTTPS in production
      });

      console.log(accessToken);

      return { accessToken, authInfo };
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
