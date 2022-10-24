import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Producer2Service } from './producer2.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'server1-producer2',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'server1-producer2-queue',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [Producer2Service],
  exports: [Producer2Service],
})
export class Producer2Module {}
