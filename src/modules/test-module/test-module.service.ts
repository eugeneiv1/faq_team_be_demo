import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from 'src/entities/test-module.entity';
import { TestDto } from 'src/modules/test-module/dto/test-dto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>,
  ) {}

  findAll(): Promise<TestEntity[]> {
    return this.testRepository.find();
  }

  create(testDto: TestDto): Promise<TestEntity> {
    return this.testRepository.save(testDto);
  }
}
