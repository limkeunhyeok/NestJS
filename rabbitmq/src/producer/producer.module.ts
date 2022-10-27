import { Module } from '@nestjs/common';
import { RmqModule } from 'src/common/rabbitmq/rmq.module';
import { PRODUCER_SERVICE } from './constants';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    RmqModule.register({
      name: PRODUCER_SERVICE,
      queueOptions: { messageTtl: 60000 },
    }),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
