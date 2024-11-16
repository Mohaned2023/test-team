import { CookieOptions } from "express";

/**
 * This  configuration  settings are use\
 * to set the refreshToken in the cookies.
 * @author Mohaned2023
 */
export const refreshTokenCookieConfig: CookieOptions = {
    httpOnly: true,
    maxAge:  7 * 24 * 60 * 60 * 1000
}