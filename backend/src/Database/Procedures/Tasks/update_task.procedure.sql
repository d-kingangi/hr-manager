CREATE OR ALTER PROCEDURE update_task
AS
BEGIN
    UPDATE tasks
    SET
        title = @title,
        description = @description,
        due_date = @due_date,
        status = @status,
        assigned_to = @assigned_to,
        created_by = @created_by,
        estimated_effort = @estimated_effort
        completed_at = @completed_at
        labels = @labels
    WHERE task_id = @task_id;
END