import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('server1-producer1') private readonly client: ClientProxy,
  ) {}

  public emit(pattern: string, data: any) {
    return this.client.emit(pattern, data).subscribe({
      complete() {
        console.log('큐에 성공적으로 emit하면 호출');
      },
      error(err) {
        console.error(`emit 실패 시, 호출되는 듯 ${err}`);
      },
    });
  }
}
