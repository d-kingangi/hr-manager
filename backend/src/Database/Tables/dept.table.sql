CREATE TABLE departments (
    dept_id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    manager_id VARCHAR(255),
    description TEXT,
    CONSTRAINT FK_Departments_Manager FOREIGN KEY (manager_id) REFERENCES users(user_id)
);