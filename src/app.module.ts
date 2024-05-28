import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/app.service';
import { TestEntityModule } from 'src/modules/test-module/test-module.module';
import { AppController } from 'src/app.controller';
import { MysqlModule } from 'src/common/configs/database/mysql.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    MysqlModule,
    TestEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
