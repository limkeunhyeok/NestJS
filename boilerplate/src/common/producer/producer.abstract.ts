import { ClientProxy } from '@nestjs/microservices';
import { IProducer } from './producer.interface';

export abstract class BaseProducer implements IProducer {
  private client: ClientProxy;

  constructor(client: ClientProxy) {
    this.client = client;
  }

  // event pattern
  public emit(pattern: string, data: any) {
    return this.client.emit(pattern, data).subscribe({
      complete: () => {
        console.log('data emitting successfully');
      },
      error: () => {
        console.error('data emitting failed');
      },
    });
  }

  // message pattern
  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe({
      complete: () => {
        console.log('data sending successfully');
      },
      error: () => {
        console.error('data sending failed');
      },
    });
  }
}
