import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'server1-producer1-queue',
      noAck: false,
    },
  });
  await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'server1-producer2-queue',
      noAck: false,
    },
  });
  await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: '2-way',
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
