import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJs - Simple API')
    .setDescription('Example - This API is a simple users CRUD')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      //apisSorter: 'alpha',
      tagsSorter: 'alpha',
      //operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
