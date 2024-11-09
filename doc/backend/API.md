## APIs
| API                          | HTTP   | Role  | For                  |
|------------------------------|--------|-------|----------------------|
| `/api/auth/register`         | POST   | Any   | Registration         |
| `/api/auth/login`            | POST   | Any   | Login                |
| `/api/auth/refresh`          | POST   | User  | Get New Access Token |
| `/api/auth/{username}`       | GET    | User  | Get User Information |
| `/api/auth/{username}`       | PATCH  | User  | Update User Info     |
| `/api/auth/{username}`       | DELETE | User  | Delete User          |
| `/api/auth/users?n={number}` | GET    | Admin | Get All Users        |
| `/api/auth/length`           | GET    | Any   | Number of Users      |

## Requests and Responses
- `POST /api/auth/register`
    - Request:
    ```json
    {
        "username": "<username>",
        "password": "<password>",
        "email": "<email>",
        "name": "<full-name>", 
        "gender": true
    }
    ```
    `Note:` gender is boolean field - True Male, False Female.
    - Response:
        - Access Token -> Cookies
        - Refresh Token -> Cookies

- `POST /api/auth/login`
    - Request:
    ```json
    {
        "username": "<username>",
        "password": "<password>"
    }
    ```
    - Response:
        - Access Token -> Cookies
        - Refresh Token -> Cookies

- `POST /api/auth/refresh`
    - Request:
    ```json
    {}
    ```
    - Response:
        - Access Token -> Cookies
        - Refresh Token -> Cookies

- `GET /api/auth/{username}`
    - Request:
    ```json
    {}
    ```
    - Response:
    ```json
    {
        "username": "<username>",
        "password": "<password>",
        "email": "<email>",
        "name": "<full-name>", 
        "gender": true,
        "createAt": "<timestamp>"
    }
    ```

- `PATCH /api/auth/{username}`
    - Request:
    ```json
    {
        "usename": "<new-username>"
    }
    ```
    - Response:
    ```json
    {
        "username": "<username>",
        "password": "<password>",
        "email": "<email>",
        "name": "<full-name>", 
        "gender": true,
        "createAt": "<timestamp>"
    }
    ```

- `DELETE /api/auth/{username}`
    - Request:
    ```json
    {}
    ```
    - Response:
    ```json
    {}
    ```

- `GET /api/auth/users?n={number}`
    - Request:
    ```json
    {}
    ```
    - Response:
    ```json
    {
        "users": [
            {
                "username": "<username>",
                "password": "<password>",
                "email": "<email>",
                "name": "<full-name>", 
                "gender": true,
                "createAt": "<timestamp>"
            },
            {
                "username": "<username>",
                "password": "<password>",
                "email": "<email>",
                "name": "<full-name>", 
                "gender": true,
                "createAt": "<timestamp>"
            }
        ]
    }
    ```

- `GET /api/auth/length`
    - Request:
    ```json
    {}
    ```
    - Response:
    ```json
    {
        "numberOfUsers": 1000
    }
    ```