import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProducerService } from './producer/producer.service';
import { Producer2Service } from './producer2/producer2.service';
import { twoWayService } from './twoWay/twoWay.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: ProducerService,
    private readonly producer2Sevice: Producer2Service,
    private readonly twoWayService: twoWayService,
  ) {}

  @Get()
  async getHello() {
    this.producerService.emit('server1-emit', {
      message: this.appService.getHello(),
    });
    return 'Message sent to the queue by server1 producer';
  }

  @Get('/test')
  async getTest() {
    this.producer2Sevice.send('server1-send', {
      message: 'Producer2 service',
    });
    return 'Producer2';
  }

  @EventPattern('server2-emit')
  getEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
  }

  @EventPattern('server2-emit2')
  getEvent2(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
    this.producerService.emit('server1-emit', {
      message: 'server2 -> server1 -> server2 emit2',
    });
  }

  @MessagePattern('server1')
  getTwoWay(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    console.log('server2 -> server1 2-way');
    channel.ack(orginalMessage);
  }

  @Get('/server2')
  async getTest2() {
    this.twoWayService.send('server2', {
      message: 'twoWay service',
    });
    return '2-way';
  }
}
