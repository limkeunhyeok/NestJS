import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';
import { Channel, Message } from 'amqplib';
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

  @Get('/queue')
  async peek() {
    const manager = await amqp.connect('amqp://guest:guest@localhost:5672');
    // const channel = await manager.connection.createChannel();
    // const data = await channel.checkQueue('server1-producer1-queue');
    console.log(manager.connection);
    return manager;
  }

  @EventPattern('server1-emit')
  async getHello(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel: Channel = context.getChannelRef();
    const orginalMessage = context.getMessage() as Message;
    const pattern = context.getPattern();
    const channelData = await channel.consume(
      'server1-producer2-queue',
      (msg) => console.log('!!!', msg),
    );
    console.log('data!!', data, pattern);
    console.log('channel data', channelData);
    // console.log(
    //   'original content',
    //   Buffer.from(orginalMessage.content).toString(),
    // );
    // console.log('original fields', orginalMessage.fields);
    // console.log('original properties', orginalMessage.properties);
    // channel.nack(orginalMessage);
  }

  @MessagePattern('server1-send')
  getTest(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data1', data);
    // channel.ack(orginalMessage);
  }

  @MessagePattern('server1-send')
  getTest3(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data2', data);
    // channel.ack(orginalMessage);
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
