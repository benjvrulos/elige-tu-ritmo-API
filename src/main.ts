import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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
  /**
   * Swagger Configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS - Elige tu ritmo API')
    .setDescription('Use the base API URL as http://localhost:3000')
    // .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'https://github.com')
    .addServer('http://localhost:3000')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setup the aws sdk used uploading the files to aws s3 bucket
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId') ?? '',
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey') ?? '',
    },
    region: configService.get('appConfig.awsRegion'),
  });

  ts;
  const allowedOrigins = [
    process.env.FRONTEND_DEV_URL,
    process.env.FRONTEND_PREVIEW_URL,
    process.env.FRONTEND_PROD_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  });
}
bootstrap();
