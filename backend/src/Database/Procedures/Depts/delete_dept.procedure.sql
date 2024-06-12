CREATE OR ALTER PROCEDURE delete_dept
AS
BEGIN
    UPDATE departments
    SET is_deleted = 1
    WHERE dept_id = @dept_id
END