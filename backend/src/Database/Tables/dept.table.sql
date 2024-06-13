CREATE TABLE departments (
    dept_id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    manager_id VARCHAR(255),
    description TEXT,
    is_deleted BIT DEFAULT 0,
    CONSTRAINT FK_Departments_Manager FOREIGN KEY (manager_id) REFERENCES users(user_id)
);

ALTER TABLE departments DROP CONSTRAINT FK_Departments_Manager 

ALTER TABLE departments ADD CONSTRAINT FK_Departments_Manager FOREIGN KEY (manager_id) REFERENCES users(user_id)