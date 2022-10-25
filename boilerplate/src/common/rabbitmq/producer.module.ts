import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.RABBIT_MQ_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: process.env.RABBIT_MQ_PRODUCER_QUEUE,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
