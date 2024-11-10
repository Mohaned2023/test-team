import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/user.entity";

export const typeormConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: +configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
        database: configService.get<string>('DATABASE_NAME', 'test_team'),
        entities: [UserEntity],
        synchronize: configService.get<string>('DATABASE_SYNC') === 'true',
    }),
    inject: [ConfigService]
}