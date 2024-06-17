CREATE OR ALTER PROCEDURE new_task
AS
BEGIN
    SELECT * FROM 
    tasks
    WHERE is_notified = 0
END