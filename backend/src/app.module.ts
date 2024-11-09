import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './configs/typeorm.config';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
