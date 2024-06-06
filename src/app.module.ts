import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MysqlModule } from 'src/common/configs/database/mysql.module';

import { AuthModule } from './modules/auth/auth.module';
import { SuperAdminSeedService } from './modules/auth/super-admin-seed.service';
import { GoogleAuthModule } from './modules/google-auth/google-auth.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';
import { SIGNIN_EXPIRATION_TIME } from './utils/generalConstants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: SIGNIN_EXPIRATION_TIME },
      }),
      inject: [ConfigService],
    }),
    MysqlModule,
    AuthModule,
    GoogleAuthModule,
    UserModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperAdminSeedService],
})
export class AppModule {}
