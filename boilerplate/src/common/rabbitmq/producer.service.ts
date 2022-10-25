import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(
    @Inject(process.env.RABBIT_MQ_NAME) private readonly client: ClientProxy,
    private logger: Logger,
  ) {}

  // event pattern
  public emit(pattern: string, data: any) {
    return this.client.emit(pattern, data).subscribe({
      complete: () => {
        this.logger.log('data emitting successfully');
      },
      error: () => {
        this.logger.error('data emitting failed');
      },
    });
  }

  // message pattern
  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).subscribe({
      complete: () => {
        this.logger.log('data sending successfully');
      },
      error: () => {
        this.logger.error('data sending failed');
      },
    });
  }
}
