import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('server2-producer1') private readonly client: ClientProxy,
  ) {}

  public emit(pattern: string, data: any) {
    return this.client.emit(pattern, data).subscribe();
  }
}
