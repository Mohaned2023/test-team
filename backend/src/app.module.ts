import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './configs/typeorm.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { rateLimitConfig } from './configs/rate-limit.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule,
    ThrottlerModule.forRoot(rateLimitConfig)
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
})
export class AppModule {}
