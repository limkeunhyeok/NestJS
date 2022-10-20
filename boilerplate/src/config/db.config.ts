import { User } from 'src/typeorm/entities';
import { DataSourceOptions } from 'typeorm';

export const getDbOptions = (): DataSourceOptions => {
  return {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    port: Number(process.env.TYPEORM_PORT),
    database: process.env.TYPEORM_DATABASE,
    timezone: 'Z',
    charset: 'utf8_unicode_ci',
    synchronize: process.env.TYPEORM_SYNC !== undefined,
    logging: process.env.TYPEORM_LOGGING !== undefined,
    entities: [User],
    migrations: [],
    subscribers: [],
  };
};
