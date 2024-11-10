import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

/**
 * @author Mohaned2023
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = parseInt( configService.get<string>('SERVER_PORT', '3000'), 10 );
  await app.listen(PORT);
}
bootstrap();
