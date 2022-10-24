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
import { twoWayService } from './twoWay/twoWay.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: ProducerService,
    private readonly twoWayService: twoWayService,
  ) {}

  @EventPattern('server1-emit')
  getHello(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
  }

  @MessagePattern('server1-send')
  getTest(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    channel.ack(orginalMessage);
  }

  @Get()
  async test1() {
    this.producerService.emit('server2-emit', {
      message: 'server2 -> server1 emit!',
    });
    return 'server2 emit';
  }

  @Get('/test')
  async test2() {
    this.producerService.emit('server2-emit2', {
      message: 'server2 -> server1 emit2!',
    });
    return 'server2 emit2';
  }

  @MessagePattern('server2')
  getTwoWay(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data', data);
    console.log('server1 -> server2 2-way');
    channel.ack(orginalMessage);
  }

  @Get('/server1')
  async getTest2() {
    this.twoWayService.send('server1', {
      message: 'twoWay service',
    });
    return '2-way';
  }
}
