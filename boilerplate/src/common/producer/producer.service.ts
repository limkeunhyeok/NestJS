import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseProducer } from './producer.abstract';

@Injectable()
export class ProducerService extends BaseProducer {
  constructor(@Inject('test') client: ClientProxy) {
    super(client);
  }
}
