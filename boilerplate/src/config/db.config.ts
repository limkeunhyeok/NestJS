import { User } from 'src/typeorm/entities';
import { DataSourceOptions } from 'typeorm';

export const dbOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  port: 3306,
  database: 'apollo',
  timezone: 'Z',
  charset: 'utf8_unicode_ci',
  synchronize: process.env.TYPEORM_SYNC !== undefined,
  logging: process.env.TYPEORM_LOGGING !== undefined,
  entities: [User],
  migrations: [],
  subscribers: [],
};
