import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingIntercepter } from './logging.interceptor';

@Module({
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LoggingIntercepter },
  ]
})
export class LoggingModule {}
