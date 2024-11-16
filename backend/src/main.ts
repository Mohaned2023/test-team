import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
/**
 * @author Mohaned2023
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = 0 | configService.get<number>('SERVER_PORT', 3000) ;
  await app.listen(PORT);
}
bootstrap();
