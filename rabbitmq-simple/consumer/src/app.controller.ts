import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('last')
  getMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { content } = context.getMessage();
    const {
      content: { headers },
    } = context.getMessage();

    console.log('originalMsg', originalMsg);
    console.log('originalMsg Content', Buffer.from(content).toString());
    console.log('pattern', context.getPattern());
    console.log(headers);
    // channel.ack(originalMsg);
  }
}
