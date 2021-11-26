import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/exception/notfoundexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // app.setGlobalPrefix("api", {
  //   exclude: ['health', '']
  // });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Minibook')
    .setDescription('The minibook API backend services')
    .setVersion('1.0')
    .addTag('mini')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(
    configService.get<number>('port'),
    configService.get<string>('address'),
  );
}
bootstrap();
