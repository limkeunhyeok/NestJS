import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCER_SERVICE } from './constants';

@Injectable()
export class ProducerService {
  constructor(@Inject(PRODUCER_SERVICE) private producerClient: ClientProxy) {}

  async emit(pattern, data) {
    return this.producerClient.emit(pattern, data).subscribe({});
  }

  async send(pattern, data) {
    return this.producerClient.send(pattern, data).subscribe({});
  }
}
