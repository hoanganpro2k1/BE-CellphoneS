import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('CellphoneS API')
    .setDescription('Online shopping website')
    .setVersion('1.0')
    .addTag('CellphoneS')
    // .addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key') Khóa xác thực
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
