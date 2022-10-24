import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Producer2Service {
  constructor(
    @Inject('server1-producer2') private readonly client: ClientProxy,
  ) {}

  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe({
      complete() {
        console.log('큐에 성공적으로 send 시 호출');
      },
    });
  }
}
