import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class twoWayService {
  constructor(@Inject('2-way') private readonly client: ClientProxy) {}

  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe({
      complete() {
        console.log('2-way');
      },
    });
  }
}
