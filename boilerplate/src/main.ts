import { NestFactory } from '@nestjs/core';
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

  await app.listen(3000);
}
bootstrap();
