import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerModule } from './common/consumer/consumer.module';
import { ExceptionModule } from './common/exception/exception.module';
import { HealthModule } from './common/health-check/health.module';
import { LoggingModule } from './common/logging/logging.module';
import { ProducerModule } from './common/producer/producer.module';
import { getDbOptions } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot(getDbOptions()),
    LoggingModule,
    ExceptionModule,
    HealthModule,
    ProducerModule.register({
      name: 'test',
      url: 'amqp://guest:guest@localhost:5672',
      queue: 'test_queue',
    }),
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
