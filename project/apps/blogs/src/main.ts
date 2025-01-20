/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blogs example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('Blogs')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  // const configService = app.get(ConfigService);

  // const applicationConfig = configService.get(usersConfigNamespace.application);
  // const { port } = applicationConfig;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3040);
  Logger.log(
    `🚀 Application is running on: http://localhost:${3040}/${globalPrefix}`
  );
}

bootstrap();
