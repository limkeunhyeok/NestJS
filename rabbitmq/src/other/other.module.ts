import { Module } from '@nestjs/common';
import { ProducerModule } from 'src/producer/producer.module';
import { OtherController } from './other.controller';

@Module({
  imports: [ProducerModule],
  controllers: [OtherController],
  providers: [],
})
export class OtherModule {}
