CREATE OR ALTER PROCEDURE get_dept_employees
@dept_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM employees
    WHERE dept_id = @dept_id
    AND is_deleted = 0
END