import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Aweasome API')
    .setDescription('A simple and powerful REST API built with NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}