import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('LAST_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    const message = 'hello world';
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();
    this.client.emit('last', record);

    return 'Hello World!';
  }
}
