import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const getSwaggerConfig = (): Omit<OpenAPIObject, 'paths'> => {
  const config = new DocumentBuilder()
    .setTitle('Apollo App')
    .setDescription('The apollo app API description.')
    .setVersion('1.0')
    .build();

  return config;
};
