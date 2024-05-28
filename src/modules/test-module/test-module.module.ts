import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from 'src/entities/test-module.entity';
import { TestController } from 'src/modules/test-module/test-module.controller';
import { TestService } from 'src/modules/test-module/test-module.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  providers: [TestService],
  controllers: [TestController],
})
export class TestEntityModule {}
