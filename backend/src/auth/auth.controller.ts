import { 
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './role.enum';
import { GetUser } from './decorators/get-user.decorator';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create.dot';
import { LoginUserDto } from './dtos/login.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { Request, Response } from 'express';
import { 
    GetLengthReturnType,
    GetUsersInfosReturnType,
    NormalServiceReturnType,
    ReturnRegisterType 
} from './types.auth';
import { refreshTokenCookieConfig } from 'src/configs/cookie.config';

@Controller('auth') // /api/v1/auth
export class AuthController {

    /**
     * The AuthController logger.
     */
    private readonly logger: Logger = new Logger(AuthController.name, {timestamp: true});
    /**
     * The API path.
     */
    private readonly ApiPath: string = "/api/v1/auth";
    /**
     * This class use to define the API endpoints.
     * @param authService Auth Service.
     * @author Mohaned2023
     */
    constructor( private authService: AuthService ) {}

    /**
     * This endpoint use to create a new user (registering)\
     * and return the Response refreshToken in the cookies\
     * and the user + accessToken in the Response.
     * 
     * You can use it at `/api/v1/auth/register`.
     * 
     * @param createUserDto User creation information.
     * @param res Express Response.
     * @returns {Promise<void>}
     */
    @Post('register')
    async register(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
        @Res() res: Response 
    ): Promise<void> {
        this.logger.log(`POST ${this.ApiPath}/register ....`);
        const registerData: ReturnRegisterType = await this.authService.register(createUserDto);
        res.cookie( 'refreshToken', registerData.refreshToken, refreshTokenCookieConfig );
        res.status(201).json({
            accessToken: registerData.accessToken,
            user: registerData.user
        });
    }

    /**
     * This endpoint use to return accessToken\
     * and user in the Response and refreshToken\
     * in the cookies.
     * 
     * You can use it at `/api/v1/auth/lgoin`
     * 
     * @param loginUserDto Login information.
     * @param res Express Response.
     * @returns {Promise<void>}
     */
    @Post('login')
    async login(
        @Body(ValidationPipe) loginUserDto: LoginUserDto,
        @Res() res: Response
    ): Promise<void> {
        this.logger.log(`POST ${this.ApiPath}/login ....`);
        const loginData = await this.authService.login(loginUserDto);
        res.cookie('refreshToken', loginData.refreshToken, refreshTokenCookieConfig);
        res.status(200).json({
            accessToken: loginData.accessToken,
            user: loginData.user
        });
    }

    /**
     * This endpoint use to return  accessToken and user\
     * information in the Response and refreshToken in\
     * the cookies.
     * 
     * You can use it at `/api/v1/auth/refresh`.
     * 
     * @param req Express Request.
     * @param res Express Response.
     * @returns {Promise<void>}
     */
    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<void> {
        this.logger.log(`POST ${this.ApiPath}/refresh ....`);
        const refreshData = await this.authService.refresh(req.cookies['refreshToken']);
        res.cookie('refreshToken', refreshData.refreshToken, refreshTokenCookieConfig);
        res.status(200).json({
            accessToken: refreshData.accessToken,
            user: refreshData.user
        });
    }

    /**
     * This endpoint use to get user information.
     * 
     * You can use it at `/api/v1/auth/info/{username}`.
     * 
     * @param username Username for the search. 
     * @param user Who call this function.
     * @returns {Promise<UserEntity>}
     */
    @UseGuards(JwtAuthGuard)
    @Get('info/:username')
    getUserInfo( 
        @Param('username') username: string,
        @GetUser() user: UserEntity
    ): Promise<UserEntity> {
        this.logger.log(`GET ${this.ApiPath}/info/${username} by ${user.username} ....`);
        return this.authService.getUserInfo(username, user);
    }

    /**
     * This endpoit use to update user information.
     * 
     * You cat use it at `/api/v1/auth/update/{username}`.
     * 
     * @param username Username to updated.
     * @param updateUserDto Update information.
     * @param user Who call this function.
     * @returns {Promise<UserEntity>}
     */
    @UseGuards(JwtAuthGuard)
    @Patch('update/:username')
    updateUserInfo( 
        @Param('username') username: string,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @GetUser() user: UserEntity
    ): Promise<UserEntity> {
        this.logger.log(`PATCH ${this.ApiPath}/update/${username} by ${user.username} ....`);
        return this.authService.updateUserInfo(username, updateUserDto, user);
    }

    /**
     * This endpoint use to delete the user using username\
     * and return a message to the client.
     * 
     * You can use it at `/api/v1/auth/delete/{username}`
     *
     * @param username Username to delete.
     * @param user Who call this function.
     * @returns {Promise<NormalServiceReturnType>}
     */
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:username')
    deleteUser( 
        @Param('username') username: string,
        @GetUser() user: UserEntity
    ): Promise<NormalServiceReturnType> {
        this.logger.log(`DELETE ${this.ApiPath}/delete/${username} by ${user.username} ....`);
        return this.authService.delete(username, user);
    }

    /**
     * This endpoint use to get a range of\
     * users informations.
     * 
     * You can use it at `/api/v1/auth/users`.
     * 
     * @param start Start point.
     * @param end End point.
     * @param user who call this function.
     * @returns {Promise<GetUsersInfosReturnType>}
     */
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('users')
    getUsersInfos(
        @Query('start', ParseIntPipe) start: number,
        @Query('end', ParseIntPipe) end: number,
        @GetUser() user: UserEntity
    ): Promise<GetUsersInfosReturnType> {
        this.logger.log(`GET ${this.ApiPath}/users by ${user.username} ....`);
        return this.authService.getUsersInfos(start, end, user);
    }

    /**
     * This endpoint use to get the count of users.
     * 
     * You can use it at `/api/v1/auth/length`.
     * 
     * @returns {Promise<GetLengthReturnType>}
     */
    @Get('length')
    getNumberOfUsers(): Promise<GetLengthReturnType> {
        this.logger.log(`GET ${this.ApiPath}/length ....`);
        return this.authService.getLength();
    }
}
