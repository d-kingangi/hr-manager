CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY IDENTITY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL,
    password NVARCHAR(MAX) NOT NULL,
    is_admin BIT DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    is_deleted BIT DEFAULT 0
);
