CREATE OR ALTER PROCEDURE delete_task
    @task_id VARCHAR(255)
AS
BEGIN 
    DELETE FROM tasks WHERE task_id = @task_id;
END 