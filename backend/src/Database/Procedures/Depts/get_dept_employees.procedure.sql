CREATE OR ALTER PROCEDURE get_dept_employees
AS
BEGIN
    SELECT * FROM employees
    WHERE dept_id = @dept_id
    AND is_deleted = 0
END