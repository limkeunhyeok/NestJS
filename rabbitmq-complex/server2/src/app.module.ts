import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { twoWayModule } from './twoWay/twoWay.module';

@Module({
  imports: [ProducerModule, twoWayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
