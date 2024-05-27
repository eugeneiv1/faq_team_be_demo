import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEntity } from 'src/entities/test-module.entity';
import { TestDto } from 'src/test-module/dto/test-dto.dto';

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
