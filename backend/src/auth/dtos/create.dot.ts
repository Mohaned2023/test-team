import { 
    IsBoolean, 
    IsEmail, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    Matches, 
    MaxLength, 
    MinLength 
} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @Matches(
        /([a-z0-9_]+)/,
        {message: 'username is not matches the ([a-z0-9_]+)'}
    )
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'password too weak.'}
    )
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsOptional()
    @IsBoolean()
    gender?: boolean;

}