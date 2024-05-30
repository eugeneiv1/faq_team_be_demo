import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/modules/auth/dto/auth.dto';
import { LogDto } from 'src/modules/auth/dto/log.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsersServiceErrors } from 'src/utils/constants/errorTexts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<UserDto | undefined> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(UsersServiceErrors.errors.NOT_FOUND(email));
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(UsersServiceErrors.errors.FIND);
    }
  }

  async create(user: LogDto): Promise<UserDto> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const myuuid = uuidv4();
      const newUser = {
        ...user,
        id: myuuid,
        password: hashedPassword,
      } as UserDto;
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(UsersServiceErrors.errors.CREATE);
    }
  }
}