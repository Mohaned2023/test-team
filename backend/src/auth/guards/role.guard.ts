import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";


/**
 * This guard use for cheking the users roles.
 * @implements {CanActivate}
 * @author Mohaned2023
 */
@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger: Logger = new Logger(RolesGuard.name)
    constructor( private reflector: Reflector = new Reflector() ){}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles,context.getHandler());
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if ( !roles.includes(user.role) ){
            this.logger.warn(`Cancel access attempt from '${request.ip}' by '${user.username}' !!!`);
            return false;
        }
        return true;
    }
}