import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = 3005
  initSwagger(app)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(port);
  logger.log(`Servidor corriendo  en ${await app.getUrl()}`);
}
bootstrap();
