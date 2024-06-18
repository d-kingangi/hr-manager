CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL,
    dept_id VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    is_admin BIT DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME,
    is_deleted BIT DEFAULT 0,
    is_welcomed BIT DEFAULT 0,
    CONSTRAINT FK_Users_Department FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- ALTER TABLE users ADD CONSTRAINT FK_Users_Department FOREIGN KEY (dept_id) REFERENCES departments(dept_id)

ALTER TABLE users DROP CONSTRAINT FK_Users_Department 

ALTER TABLE users ADD  is_welcomed BIT DEFAULT 0