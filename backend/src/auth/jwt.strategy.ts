import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayloadInterface } from "./interfaces.auth";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { omitObjectKeys } from "src/utils/omit.util";

/**
 * This class use for validate the JWT.
 * ### Exceptions:
 * - UnauthorizedException - JWT is not valid.
 * @author Mohaned2023
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }

    async validate( payload: JwtPayloadInterface ): Promise<UserEntity> {
        const { username } = payload;
        const user = await this.userRepository.findOne({where: { username }});
        if ( !user ) throw new UnauthorizedException();
        return omitObjectKeys(user, ['password', 'solt'] ) as UserEntity;
    }
}