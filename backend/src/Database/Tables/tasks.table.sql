CREATE TABLE tasks (
    task_id VARCHAR(255) PRIMARY KEY ,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME,
    status VARCHAR(255) NOT NULL,
    assigned_to VARCHAR(255),
    created_by VARCHAR(255),
    estimated_effort INT,
    completed_at DATETIME,
    labels VARCHAR(255),
    CONSTRAINT FK_Tasks_AssignedTo FOREIGN KEY (assigned_to) REFERENCES users(user_id),
    CONSTRAINT FK_Tasks_CreatedBy FOREIGN KEY (created_by) REFERENCES users(user_id)
);
