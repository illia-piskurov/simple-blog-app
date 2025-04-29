import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    {
      origin: 'http://localhost:3001',
      methods: 'GET,POST,UPDATE,DELETE,PATCH',
      credentials: true,
    }
  );
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
