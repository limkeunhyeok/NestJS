import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './all-exceptions.filter';

@Module({
  providers: [Logger, { provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class ExceptionModule {}
