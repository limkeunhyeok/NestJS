import { Controller, Get } from '@nestjs/common';
import { ProducerService } from '../producer/producer.service';

@Controller('other')
export class OtherController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async getHello() {
    await this.producerService.emit('producer', 'hello');
    return 'Good';
  }
}
