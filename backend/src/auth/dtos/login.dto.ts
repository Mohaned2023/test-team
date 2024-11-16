import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create.dot";

export class LoginUserDto  extends PickType(CreateUserDto, ['username','password']) {}