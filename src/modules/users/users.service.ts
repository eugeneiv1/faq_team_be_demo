import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/Log.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<UserDto | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: LogDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }
}
