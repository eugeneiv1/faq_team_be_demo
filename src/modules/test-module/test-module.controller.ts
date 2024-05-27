import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from 'src/modules/test-module/test-module.service';
import { TestEntity } from 'src/entities/test-module.entity';
import { TEST_MODULE_ROUTE } from 'src/utils/constants';
import { TestDto } from 'src/modules/test-module/dto/test-dto.dto';

@Controller(TEST_MODULE_ROUTE)
@ApiTags(TEST_MODULE_ROUTE)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll(): Promise<TestEntity[]> {
    return this.testService.findAll();
  }

  @Post()
  create(@Body() testDto: TestDto): Promise<TestEntity> {
    return this.testService.create(testDto);
  }
}
