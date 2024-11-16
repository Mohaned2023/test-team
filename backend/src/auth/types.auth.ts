import { UserEntity } from "./user.entity"

/**
 * This type use for the register function\
 * to  return  the user, refreshToken  and\
 * accessToken.
 * @author Mohaned2023
 */
export type ReturnRegisterType = {
    user: UserEntity, 
    refreshToken: string, 
    accessToken: string
}

/**
 * This type use for the service function\
 * return.
 * @author Mohaned2023
 */
export type NormalServiceReturnType = {
    message: string
}

/**
 * This type use for return the length\
 * of the users.
 * @author Mohaned2023
 */
export type GetLengthReturnType = {
    numberOfUsers: number
}

/**
 * This type use for return the informations\
 * of the users.
 * @author Mohaned2023
 */
export type GetUsersInfosReturnType = {
    users: UserEntity[]
}