import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TestEntityModule } from 'src/test-module/test-module.module';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from './common/configs/database/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MysqlModule,
    TestEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
