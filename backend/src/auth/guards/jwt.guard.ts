import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * This guard use for JWT checking.
 * @extends {AuthGuard}
 * @author Mohaned2023
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}