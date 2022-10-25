import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HealthModule } from './common/health-check/health.module';
import { getSwaggerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config, {
    include: [HealthModule, AppModule],
  });
  SwaggerModule.setup('api-docs', app, document);

  await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'test_queue',
      noAck: false,
      queueOptions: {
        exchange: [
          {
            name: 'test',
            type: 'fanout',
          },
        ],
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
