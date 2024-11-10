import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../user.entity";

/**
 * This decorator use for extract the\
 * user object from the request.
 * @author Mohaned2023
 */
export const GetUser = createParamDecorator( (_, ctx: ExecutionContext ): UserEntity => {
    return ctx.switchToHttp().getRequest().user;
});