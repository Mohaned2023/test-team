import { 
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dot';
import * as bcrypt from 'bcrypt'; 
import { omitObjectKeys } from 'src/utils/omit.util';
import { ConfigService } from '@nestjs/config';
import { 
    GetLengthReturnType, 
    GetUsersInfosReturnType,
    NormalServiceReturnType,
    ReturnRegisterType
} from './types.auth';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './role.enum';
import { UpdateUserDto } from './dtos/update.dto';
import { LoginUserDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    
    /**
     * The AuthService logger.
     */
    private readonly logger: Logger = new Logger(AuthService.name, {timestamp: true});

    /**
     * This class use for auth controller logic.
     * @param userRepository User Repository for TypeOrm.
     * @param configService Configuration service for the config .evn.
     * @param jwtService JWT service for the jwt logic.
     * @author Mohaned2023
     */
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    /**
     * This function use to create new user.
     * ### Exception:
     * - `HttpException - 302` - if the user already registered.
     * - `InternalServerErrorException` - JWT missing configuration.
     * @param createUserDto The user creation information.
     * @returns {Promise<ReturnRegisterType>}
     * @author Mohaned2023
     */
    async register(createUserDto: CreateUserDto): Promise<ReturnRegisterType> {
        let user: UserEntity = this.userRepository.create();
        user.username = createUserDto.username.toLowerCase();
        user.name = createUserDto.name;
        user.email = createUserDto.email.toLowerCase();
        user.gender = createUserDto.gender !== false ;
        user.solt = await bcrypt.genSalt(
            0 | this.configService.get<number>('USER_PASSWORD_SOLT_RANGE', 12)
        );
        user.password = await bcrypt.hash(createUserDto.password, user.solt);
        try {
            user = await user.save();
            this.logger.log(`Create new user with username: '${user.username}'.`);
            return this.formatRegisterReturnType(user);
        } catch ( error ) {
            if  (error.code == '23505' )
                throw new HttpException(`The username or email is already registered!`, HttpStatus.FOUND);
            throw new InternalServerErrorException( error );
        }
    }

    /**
     * This function use to create accessToken\
     * and refreshToken by login.
     * 
     * ### Exception:
     * - `HttpException - 404` - User not found.
     * - `HttpException - 401` - Invalid password.
     * @param loginUserDto Login information.
     * @returns {Promise<ReturnRegisterType>}
     * @author Mohaned2023
     */
    async login(loginUserDto: LoginUserDto): Promise<ReturnRegisterType> {
        const user = await this.userRepository.findOne({where: {username: loginUserDto.username.toLowerCase()}});
        if (!user) throw new HttpException(`User NOT found`, HttpStatus.NOT_FOUND);
        const passwordHash = await bcrypt.hash(loginUserDto.password, user.solt);
        if ( passwordHash != user.password ) throw new HttpException('Unauthorized Access!', HttpStatus.UNAUTHORIZED);
        return this.formatRegisterReturnType(user);
    }

    /**
     * This function use to create a new accessToken\
     * and refreshToken by the refreshToken.
     * ### Exception:
     * - `HttpException - 401` - No refreshToken.
     * - `HttpException - 404` - User not found.
     * - `HttpException - 401` - Invalid refreshToken.
     * @param refreshToken The refresh token.
     * @returns {Promise<ReturnRegisterType>}
     * @author Mohaned2023
     */
    async refresh( refreshToken: string | undefined ): Promise<ReturnRegisterType> {
        if ( !refreshToken ) throw new HttpException('Unauthorized Access!', HttpStatus.UNAUTHORIZED);
        try { 
            // TODO: Check the refreshToken with the {secre: ""}
            const decoded = this.jwtService.verify(refreshToken, { ignoreExpiration: false });
            const user = await this.userRepository.findOne({where: {username: decoded.username} });
            if (!user) throw new HttpException('User NOT found', HttpStatus.NOT_FOUND);
            this.logger.log(`Refresh tokens for user '${user.username}'.`);
            return this.formatRegisterReturnType(user);
        } catch( error ) {
            throw new HttpException('Unauthorized Access!', HttpStatus.UNAUTHORIZED)
        }
    }

    /**
     * This function use to get user information by username.
     * ### Exception:
     * - `HttpException - 400` - Invalid username.
     * - `HttpException - 404` - User not found.
     * @param username Username for the search. 
     * @param user Who call this function.
     * @returns {Promise<UserEntity>}
     * @author Mohaned2023
     */
    async getUserInfo( username: string, user: UserEntity ): Promise<UserEntity> {
        if (username.length < 3) throw new HttpException('Username is invalid!', HttpStatus.BAD_REQUEST);
        let userInfo: UserEntity = await this.userRepository.findOne({where: {username: username.toLowerCase()}});
        if (!userInfo) throw new HttpException(`User '${username}' NOT found!`, HttpStatus.NOT_FOUND);
        userInfo = omitObjectKeys(userInfo, ['password', 'solt']) as UserEntity;
        if ( username !== user.username && user.role !== UserRole.ADMIN ) {
            this.logger.log(`User '${user.username}' get the information about user '${username}'.`);
            userInfo = omitObjectKeys( userInfo, ['create_at', 'email','id', 'role'] ) as UserEntity;
        }
        return userInfo;
    }

    /**
     * This function use fo update the user information.
     * 
     * ### Exception:
     * - `HttpException - 400` - Username or DTO error.
     * - `HttpException - 403` - Unauthorized user.
     * - `HttpException - 400` - Invalid body.
     * - `HttpException - 404` - Username not found.
     * - `HttpException - 302` - DTO.username found.
     * @param username Username to updated.
     * @param updateUserDto Update information.
     * @param user Who call this function.
     * @returns {Promise<UserEntity>}
     * @author Mohaned2023
     */
    async updateUserInfo( username: string, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
        const updateUserDtoKeys: string[] = Object.keys(updateUserDto);
        if (username.length < 3 || updateUserDtoKeys.length == 0) 
            throw new HttpException('Username is invalid or body is missing!', HttpStatus.BAD_REQUEST);
        if ( username != user.username && user.role != UserRole.ADMIN) {
            // if the user try to update another user..
            this.logger.warn(`User '${user.username}' try to update the user '${username}' !!!`);
            throw new HttpException(`You cann't update another user!`, HttpStatus.FORBIDDEN);
        }
        let updateKeys: string[] = [
            'username',
            'name',
            'email',
            'gender'
        ];
        if ( user.role == UserRole.ADMIN ) updateKeys.push('role');
        if ( username == user.username ) updateKeys.push('password');
        if (
            !updateUserDtoKeys.every( (key) => updateKeys.includes(key) )
        ) throw new HttpException(`Ther is invalid fields in the body!`, HttpStatus.BAD_REQUEST);
        let userInfo = await this.userRepository.findOne({where: {username: username.toLowerCase()} });
        if ( !userInfo ) throw new HttpException(`User '${username}' NOT found!`, HttpStatus.NOT_FOUND);
        Object.assign(userInfo, updateUserDto);
        if ( updateUserDtoKeys.includes('password') )
            userInfo.password = await bcrypt.hash( updateUserDto.password, userInfo.solt);
        try { // if username or email is found in the database:
            await userInfo.save();
            this.logger.log(`Update user '${username}' information by '${user.username}'.`);
            return omitObjectKeys(userInfo,['password', 'solt']) as UserEntity;
        } catch ( error ) {
            if  (error.code == '23505' )
                throw new HttpException(`The username or email is already registered!`, HttpStatus.FOUND);
            throw new InternalServerErrorException();
        }
    }

    /**
     * This function use to delete the user\
     * from the database by the username.
     * 
     * ### Exception:
     * - `HttpException - 400` - Username is invalid.
     * - `HttpException - 403` - User cann't delete the username.
     * - `HttpException - 404` - Username not found.
     * @param username Username to delete.
     * @param user Who call this function.
     * @author Mohaned2023
     */
    async delete(username: string, user: UserEntity): Promise<NormalServiceReturnType>{
        if (username.length < 3) throw new HttpException('Username is invalid!', HttpStatus.BAD_REQUEST);
        else if ( username !== user.username && user.role !== UserRole.ADMIN ) {
            // if the user try to delete another user..
            this.logger.warn(`User '${user.username}' try to delete the user '${username}' !!!`);
            throw new HttpException(`You cann't delete another user!`, HttpStatus.FORBIDDEN);
        } 
        const {affected} = await this.userRepository.delete({username: username.toLowerCase()});
        if ( affected > 0 ) {
            this.logger.log(`Deleted user '${username}' by '${user.username}'.`);
            return {message: `The user '${username}' deleted successfully.`};
        }
        throw new HttpException(`User '${username}' NOT found!`, HttpStatus.NOT_FOUND);
    }

    /**
     * This function use to get a range of uses informations.
     * 
     *  ### Exception:
     * - `UnauthorizedException` - User is not admin.
     * - `HttpException - 400` - Invalid start or end point. 
     * - `HttpException - 404` - Out of range. 
     * @param start Start point.
     * @param end End point.
     * @param user who call this function.
     * @returns {Promise<GetUsersInfosReturnType>}
     * @author Mohaned2023
     */
    async getUsersInfos(start: number, end:number, user: UserEntity): Promise<GetUsersInfosReturnType> {
        if ( start < 0 || end < 0 || start > end ) throw new HttpException('Invalid start or end point!', HttpStatus.BAD_REQUEST);
        const users = await this.userRepository.find({
            skip: start,
            take: end - start
        });
        if ( users.length == 0 ) throw new HttpException('No more users!', HttpStatus.NOT_FOUND);
        let usersOmited: UserEntity[] = [];
        users.forEach( (user_) => {
            usersOmited.push( omitObjectKeys(user_, ['password', 'solt']) as UserEntity );
        });
        this.logger.log(`Admin '${user.username}' get users infromations, the range from ${start} to ${end}.`);
        return { users: usersOmited };
    }

    /**
     * This function use to return how many users in the database.
     * @returns {Promise<GetLengthReturnType>}
     * @author Mohaned2023
     */
    async getLength(): Promise<GetLengthReturnType>{
        return {
            numberOfUsers: await this.userRepository.count()
        }
    }

    /**
     * This function use to sign the accessToken\
     * and the refreshToken and format the Register
     * Return Type.
     * 
     * @param user The User to sign.
     * @returns {ReturnRegisterType}
     * @author Mohaned2023
     */
    private formatRegisterReturnType(user: UserEntity): ReturnRegisterType{
        return {
            user: omitObjectKeys(user, ['password', 'solt']) as UserEntity,
            accessToken: this.jwtService.sign({username: user.username}),
            refreshToken: this.jwtService.sign(
                    {id: user.id, username: user.username},
                    { expiresIn: '7d' }
                )
        }
    }
}