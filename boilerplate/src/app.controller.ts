import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ProducerService } from './common/producer/producer.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producer: ProducerService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'ok' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send')
  async send() {
    await this.producer.send('pattern', { test: 1 });
    return 'send test';
  }
}
