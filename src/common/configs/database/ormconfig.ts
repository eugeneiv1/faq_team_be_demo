import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DB_TYPE } from 'src/utils/constants';

export const createTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: DB_TYPE,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../../migrations/*.ts`],
    synchronize: false,
  };
};
