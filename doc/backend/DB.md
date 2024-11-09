## Database Map
- Database tyoe: `Postgres`
- Database name: `test_team`
- Database tables: `[users]`
- Database scheme: 
    - `users`
    ```sql
    users {
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        solt TEXT NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(10) CHECK ( role IN ('USER', 'ADMIN') ),
        gender BOOLEAN NOT NULL DEFAULT TRUE,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    }
    ```