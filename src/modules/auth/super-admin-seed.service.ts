import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { EUserRole } from '../../entities/enums/user-role.enum';
import { UserRepository } from '../repository/services/user.repository';
import { SuperAdminConfig } from './types/super-admin.type';

@Injectable()
export class SuperAdminSeedService implements OnModuleInit {
  private superAdminConfig: SuperAdminConfig;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    this.superAdminConfig = {
      full_name: this.configService.get('ADMIN_NAME'),
      email: this.configService.get('ADMIN_EMAIL'),
      password: this.configService.get('ADMIN_PASSWORD'),
    };
  }
  async onModuleInit(): Promise<void> {
    const isExist = await this.userRepository.findOneBy({
      email: this.superAdminConfig.email,
    });
    if (isExist) {
      return;
    }
    const hashedPassword = await bcrypt.hash(this.superAdminConfig.password, 7);

    await this.userRepository.save(
      this.userRepository.create({
        full_name: this.superAdminConfig.full_name,
        email: this.superAdminConfig.email,
        password: hashedPassword,
        user_role: EUserRole.SUPERADMIN,
      }),
    );
  }
}
