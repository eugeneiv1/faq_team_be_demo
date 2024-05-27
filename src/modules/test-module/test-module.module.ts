import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from 'src/entities/test-module.entity';
import { TestService } from 'src/modules/test-module/test-module.service';
import { TestController } from 'src/modules/test-module/test-module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  providers: [TestService],
  controllers: [TestController],
})
export class TestEntityModule {}
