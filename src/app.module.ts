import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/app.service';
import { TestEntityModule } from 'src/modules/test-module/test-module.module';
import { AppController } from 'src/app.controller';
import { MysqlModule } from 'src/common/configs/database/mysql.module';

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
