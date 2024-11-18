## Indexes:
- [Description](#description)
- [Endpoints Roles](#endpoints-roles)
- [APIs](#apis)
    - [Register](#register)
    - [Login](#login)
    - [Get New Access Token](#get-new-access-token)
    - [Get User Information](#get-user-information)
    - [Update User Information](#update-user-information)
    - [Delete User](#delete-user)
    - [Get All Users](#get-all-users)
    - [Get Number of Users](#get-number-of-users)
- [Authers](#authers)

## Description:
This project for the testing purposes.\
Building the API with the most standard design.\
Using the most standard authentication and authorization design.\
A detailed explanation of all endpoints with complete clarity.

## Endpoints Roles:
| API                             | HTTP   | Role  | For                  |
|---------------------------------|--------|-------|----------------------|
| `/api/v1/auth/register`         | POST   | Any   | Registration         |
| `/api/v1/auth/login`            | POST   | Any   | Login                |
| `/api/v1/auth/refresh`          | POST   | User  | Get New Access Token |
| `/api/v1/auth/info/{username}`  | GET    | User  | Get User Information |
| `/api/v1/auth/update/{username}`| PATCH  | User  | Update User Info     |
| `/api/v1/auth/delete/{username}`| DELETE | User  | Delete User          |
| `/api/v1/auth/users?start=&end=`| GET    | Admin | Get All Users        |
| `/api/v1/auth/length`           | GET    | Any   | Number of Users      |

## APIs:
### Register
- API Endponit: `/api/v1/auth/register`
- Mathod: `POST`
- Description: This endpoint use to create a new user.
- Request body:
    - Type: `JSON`
    - Example:
    ```json
    {
        "username": "mohaned2023",
        "name": "Mohaned Sherhan (Mr.x)",
        "password": "Mohaned2023+",
        "email": "mohaned2023@gmail.com",
        "gender": true
    }
    ```
    - Body rules:
        - `username`:
            - required.
            - type string.
            - length [3, 50].
            - consists of `a-z` or `0-9` or `_`.
            - match this pattern `/([a-z0-9_]+)/`.
        - `name`:
            - required.
            - type string.
            - length [2, 100].
        - `password`:
            - required.
            - type string.
            - length [8, 512].
            - consists of `a-zA-Z` and `0-9` and `\w`.
            - match this pattern `/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`.  
        - `email`:
            - required.
            - type string.
            - length [5, 100].
            - It must be an email.
        - `gender`:
            - not required.
            - type boolean.
            - default true male.
            - false female.
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48",
        "user": {
            "id": 29,
            "username": "mohaned2023",
            "name": "Mohaned Sherhan (Mr.x)",
            "email": "mohaned2023@gmail.com",
            "role": "user",
            "gender": true,
            "create_at": "2024-11-15 15:13:46.660422"
        }
    }
    ```
    - Status codes:
        - OK `201 - Created`: User created.
        - ERROR `302 - Found`: Username or Email is found in the database!.
        - ERROR `400 - Bad Request`: Request body is missing some fields.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
---
### Login
- API Endponit: `/api/v1/auth/login`
- Mathod: `POST`
- Description: Login using the username and password.
- Request body:
    - Type: `JSON`
    - Example:
    ```json
    {
        "username": "mohaned2023",
        "password": "Mohaned2023+",
    }
    ```
    - Body rules:
        - `username`:
            - required.
            - type string.
            - length [3, 50].
            - consists of `a-z` or `0-9` or `_`.
            - match this pattern `/([a-z0-9_]+)/`.
        - `password`:
            - required.
            - type string.
            - length [8, 512].
            - consists of `a-zA-Z` and `0-9` and `\w`.
            - match this pattern `/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`.
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48",
        "user": {
            "id": 29,
            "username": "mohaned2023",
            "name": "Mohaned Sherhan (Mr.x)",
            "email": "mohaned2023@gmail.com",
            "role": "user",
            "gender": true,
            "create_at": "2024-11-15 15:13:46.660422"
        }
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `400 - Bad Request`: Request body is missing some fields.
        - ERROR `401 - Unauthorized`: Invalid password.
        - ERROR `404 - Not Found`: User with username not found.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
---
### Get New Access Token
- API Endponit: `/api/v1/auth/refresh`
- Mathod: `POST`
- Description: Get a new access token.
- Request body: 
    - `Request body is not requires`.
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48",
        "user": {
            "id": 29,
            "username": "mohaned2023",
            "name": "Mohaned Sherhan (Mr.x)",
            "email": "mohaned2023@gmail.com",
            "role": "user",
            "gender": true,
            "create_at": "2024-11-15 15:13:46.660422"
        }
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `401 - Unauthorized`: Invalid refresh token.
        - ERROR `404 - Not Found`: User not found.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
    - Notes:
        - status code 401 -> the user has been inactive for more than 7 days or has not logged in.
        - as a frontend developer if you have status code 401 or 404 in this endpoint redirect the user to login or register page.
        - as a frontend developer if you have status code 401 in [ [Get User Information](#get-user-information), [Update User Information](#update-user-information), [Delete User](#delete-user), [Get All Users](#get-all-users) ] redirect the user to this endpoint. 
---
### Get User Information
- API Endponit: `/api/v1/auth/info/{username}`
    - username is a string with length of >= 3.
- Mathod: `GET`
- Description: Get User Information.
- Request body: 
    - `Request body is not requires`.
- Request authorization header:
    - required.
    - type: `JSON`
    ```json
    {
        "Authorization": "Bearer <accessToken>"
    }
    ```
    - Example:
    ```json
    {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48"
    }
    ```
- Response:
    - Type: `JSON`
    - Example if the user has this account or if he is an admin:
    ```json
    {
        "id": 29,
        "username": "mohaned2023",
        "name": "Mohaned Sherhan (Mr.x)",
        "email": "mohaned2023@gmail.com",
        "role": "user",
        "gender": true,
        "create_at": "2024-11-15 15:13:46.660422"
    }
    ```
    - Example if the user is not the owner of this account or not an admin:
    ```json
    {
        "username": "mohaned2023",
        "name": "Mohaned Sherhan (Mr.x)",
        "gender": true
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `400 - Bad Request`: Invalid username.
        - ERROR `401 - Unauthorized`: Invalid accessToken.
        - ERROR `404 - Not Found`: User with username not found.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
---
### Update User Information
- API Endponit: `/api/v1/auth/update/{username}`
    - username is a string with length of >= 3.
- Mathod: `PATCH`
- Description: Update User Information.
- Request body: 
    - required.
    - type: `JSON`
    - you can update one or more of:
        - username
        - name
        - email
        - gender
    - Example: 
        - if the user has this account and not an admin -> you can update the password.
        - if the user is admin and not the owner of this account -> you cann't update the passowrd.
        - if the user has this account and he is an adimn -> you can update the password.
    ```json
    {
        "username": "mohaned2023",
        "name": "Mohaned Sherhan (Mr.x)",
        "password": "Mohaned2023+",
        "email": "mohaned2023@gmail.com",
        "gender": true
    }
    ```
    - Body rules:
        - `username`:
            - type string.
            - length [3, 50].
            - consists of `a-z` or `0-9` or `_`.
            - match this pattern `/([a-z0-9_]+)/`.
        - `name`:
            - type string.
            - length [2, 100].
        - `password`:
            - type string.
            - length [8, 512].
            - consists of `a-zA-Z` and `0-9` and `\w`.
            - match this pattern `/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`.  
        - `email`:
            - type string.
            - length [5, 100].
            - It must be an email.
        - `gender`:
            - type boolean.
            - default true male.
            - false female.
- Request authorization header:
    - required.
    - type: `JSON`
    ```json
    {
        "Authorization": "Bearer <accessToken>"
    }
    ```
    - Example:
    ```json
    {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48"
    }
    ```
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "id": 29,
        "username": "mohaned2023",
        "name": "Mohaned Sherhan (Mr.x)",
        "email": "mohaned2023@gmail.com",
        "role": "user",
        "gender": true,
        "create_at": "2024-11-15 15:13:46.660422"
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `302 - Found`: Username or Email is found in the database!.
        - ERROR `400 - Bad Request`: Invalid body.
        - ERROR `401 - Unauthorized`: Invalid accessToken.
        - ERROR `403 - Forbidden`: User tried to update another account without admin permission.
        - ERROR `404 - Not Found`: User with username not found.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
---
### Delete User
- API Endponit: `/api/v1/auth/delete/{username}`
    - username is a string with length of >= 3.
- Mathod: `DELETE`
- Description: Delete User.
- Request body: 
    - `Request body is not requires`.
- Request authorization header:
    - required.
    - type: `JSON`
    ```json
    {
        "Authorization": "Bearer <accessToken>"
    }
    ```
    - Example:
    ```json
    {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48"
    }
    ```
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "message": "The user 'mohaned2023' deleted successfully."
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `400 - Bad Request`: Invalid username.
        - ERROR `401 - Unauthorized`: Invalid accessToken.
        - ERROR `403 - Forbidden`: User tried to delete another account without admin permission.
        - ERROR `404 - Not Found`: User with username not found.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
    - Notes:
        - if this account is admin than you can delete any account.
        - if this account is user than you can delete this account only.
---
### Get All Users
- API Endponit: `/api/v1/auth/users?start={number}&end={number}`
    - start and end are numbers -> start and end not lass than 0 and end not lass than start.
- Mathod: `GET`
- Description: Get users informations.
- Request body: 
    - `Request body is not requires`.
- Request authorization header:
    - required.
    - type: `JSON`
    ```json
    {
        "Authorization": "Bearer <accessToken>"
    }
    ```
    - Example:
    ```json
    {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFuZWQyMDIzIiwiaWF0IjoxNzMxNjc1MzM0LCJleHAiOjE3MzE2ODYxMzR9.MEZmEDKvl7giIH7whhWMRoxTK8v4lz8jgDytLPDcm48"
    }
    ```
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "users": [ 
            {
                "id": 29,
                "username": "mohaned2023",
                "name": "Mohaned Sherhan (Mr.x)",
                "email": "mohaned2023@gmail.com",
                "role": "user",
                "gender": true,
                "create_at": "2024-11-15 15:13:46.660422"
            },
            ...
        ]
    }
    ```
    - Status codes:
        - OK `200 - Ok`: ok.
        - ERROR `400 - Bad Request`: Invalid start or end.
        - ERROR `401 - Unauthorized`: Invalid accessToken.
        - ERROR `403 - Forbidden`: User is not admin.
        - ERROR `404 - Not Found`: Start and end out of range.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.
- Notes:
    - The Role of this endpoint is ADMIN.
---
### Get Number of Users
- API Endponit: `/api/v1/auth/length`
- Mathod: `GET`
- Description: Get Number of Users.
- Request body:
    - `Request body is not requires`.
- Response:
    - Type: `JSON`
    - Example:
    ```json
    {
        "numberOfUsers": 3092
    }
    ```
    - Status codes:
        - OK `201 - Created`: User created.
        - ERROR `429 - Too Many Requests`: More than 3req/1s or 10req/20s or 30req/1m.
        - ERROR `500 - Internal Server Error`: Backend failure -> submit an issue in github.

## Authers:
> [Mohaned2023](https://github.com/Mohaned2023) API + Docs