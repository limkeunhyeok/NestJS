import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { Producer2Module } from './producer2/producer2.module';
import { twoWayModule } from './twoWay/twoWay.module';

@Module({
  imports: [ProducerModule, Producer2Module, twoWayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
