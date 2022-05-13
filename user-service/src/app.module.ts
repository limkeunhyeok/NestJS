import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule
} from 'nest-winston'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { ExceptionModule } from './exception/exception.module';
import { LoggingModule } from './logging/logging.module';
import authConfig from './config/authConfig';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(),
    ExceptionModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
