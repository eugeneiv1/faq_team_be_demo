import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  providers: [UserService, JwtService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
