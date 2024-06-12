CREATE OR ALTER PROCEDURE update_dept
AS
BEGIN
    UPDATE departments
    SET name = @name,
        manager_id = @manager_id,
        description = @description
    WHERE dept_id = @dept_id
END