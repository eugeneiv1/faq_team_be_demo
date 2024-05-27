import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService } from 'src/test-module/test-module.service';
import { TestEntity } from 'src/entities/test-module.entity';
import { TEST_MODULE_ROUTE } from 'src/utils/constants';
import { TestDto } from 'src/test-module/dto/test-dto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
