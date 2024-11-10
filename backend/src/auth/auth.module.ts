import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    providers: [ ConfigService, JwtStrategy ]
})
export class AuthModule {}
