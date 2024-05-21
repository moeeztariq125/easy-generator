import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const cors_origin = [configService.get<string>('CORS_ORIGIN')]
  app.enableCors({ origin: cors_origin, methods: ['GET', 'PUT', 'POST', 'DELETE'] })
  await app.listen(port);
}
bootstrap();
