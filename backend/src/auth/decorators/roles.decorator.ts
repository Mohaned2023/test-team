import { Reflector } from "@nestjs/core";

/**
 * This decorator use for Roles.
 * @author Mohaned2023
 */
export const Roles = Reflector.createDecorator<string>();