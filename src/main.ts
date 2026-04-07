import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5000', // your React app's URL
  });
  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS - Elige tu ritmo API')
    .setDescription('Use the base API URL as http://localhost:3000')
    // .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'https://github.com')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
