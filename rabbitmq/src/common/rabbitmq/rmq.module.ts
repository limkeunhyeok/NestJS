import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Options } from 'amqplib';

export interface RmqModuleOptions {
  name: string;
  prefetchCount?: number;
  queueOptions?: Options.AssertQueue;
}

@Module({
  providers: [],
  exports: [],
})
export class RmqModule {
  static register({
    name,
    prefetchCount,
    queueOptions,
  }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                prefetchCount,
                queueOptions,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
