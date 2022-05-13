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
import { HealthCheckController } from './health-check/health-check.controller';
import { HealthCheckModule } from './health-check/health-check.module';
import authConfig from './config/authConfig';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from './health-check/dog.health';

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
    HealthCheckModule,
    TerminusModule,
    HttpModule
  ],
  controllers: [HealthCheckController],
  providers: [DogHealthIndicator],
})
export class AppModule {}
