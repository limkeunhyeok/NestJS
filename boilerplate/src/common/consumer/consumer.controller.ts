import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @MessagePattern('pattern')
  getReceive(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('consumer', data);
    channel.ack(orginalMessage);
  }

  @MessagePattern('pattern')
  getReceive2(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('consumer2', data);
    channel.ack(orginalMessage);
  }
}
