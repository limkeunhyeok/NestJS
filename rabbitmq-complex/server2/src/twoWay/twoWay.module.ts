import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { twoWayService } from './twoWay.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: '2-way',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: '2-way',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [twoWayService],
  exports: [twoWayService],
})
export class twoWayModule {}
