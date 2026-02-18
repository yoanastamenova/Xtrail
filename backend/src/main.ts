import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Xtrail Run API')
    .setDescription('API Documentatioon for the Xtrail running app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  // Enable CORS
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<number>('FRONT'),
    credentials: true,
  });

  //Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
