import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'server1-producer1',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'server1-producer1-queue',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
