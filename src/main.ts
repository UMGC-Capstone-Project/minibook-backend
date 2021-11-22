import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/exception/notfoundexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(parseInt(process.env.APP_PORT, 0) || 3000);
}
bootstrap();
