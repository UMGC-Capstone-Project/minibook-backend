import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
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
     defaultVersion: '1'
  });

  const configService = app.get(ConfigService);
  await app.listen(
    configService.get<number>('port'),
    configService.get<string>('address'),
  );
}
bootstrap();
