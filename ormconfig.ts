import { DataSource } from 'typeorm';
import * as path from 'path';
import * as process from 'process';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DB_TYPE } from './src/utils/constants';

config();

const configService = new ConfigService();
export default new DataSource({
  type: DB_TYPE,
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [path.join(process.cwd(), 'src', 'entities', '*.entity.ts')],
  migrations: [path.join(process.cwd(), 'src', 'migrations', '*.ts')],
  synchronize: false,
});
