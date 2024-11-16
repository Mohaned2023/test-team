import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './jwt.strategy';

/**
 * This module use for authorizing\
 * and authenticating the users.
 * @author Mohaned2023
 */
@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync(JwtConfig)
    ],
    providers: [ JwtStrategy, AuthService, JwtAuthGuard ],
    controllers: [AuthController]
})
export class AuthModule {}
