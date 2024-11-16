import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create.dot";

export class UpdateUserDto extends PartialType(CreateUserDto) {}