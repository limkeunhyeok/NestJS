import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';

@Module({})
export class ProducerModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ProducerModule,
      imports: [
        ClientsModule.register([
          {
            name: options.name,
            transport: Transport.RMQ,
            options: {
              urls: [options.url],
              queue: options.queue,
            },
          },
        ]),
      ],
      providers: [ProducerService],
      controllers: [],
      exports: [ProducerService],
    };
  }
}
