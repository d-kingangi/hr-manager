CREATE OR ALTER PROCEDURE delete_dept
@dept_id VARCHAR(255)
AS
BEGIN
    UPDATE departments
    SET is_deleted = 1
    WHERE dept_id = @dept_id
END