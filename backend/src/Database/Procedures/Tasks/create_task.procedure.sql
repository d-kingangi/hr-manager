CREATE OR ALTER PROCEDURE create_task
(
    @task_id VARCHAR(255),
    @title VARCHAR(255),
    @description TEXT,
    @due_date DATETIME,
    @status VARCHAR(255),
    @assigned_to VARCHAR(255),
    @created_by VARCHAR(255),
    @estimated_effort INT,
    @labels NVARCHAR(MAX)
)
AS
BEGIN
    INSERT INTO tasks(task_id, title, description, due_date, status, assigned_to, created_by, estimated_effort, labels)
    VALUES (@task_id, @title, @description, @due_date, @status, @assigned_to, @created_by, @estimated_effort, @labels)
END