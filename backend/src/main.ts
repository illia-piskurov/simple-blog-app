import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWRD_ORIGINS'),
    methods: '*',
    credentials: true,
  });
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
