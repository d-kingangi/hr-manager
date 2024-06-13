CREATE OR ALTER PROCEDURE get_single_dept
@dept_id VARCHAR(255)
AS
BEGIN
    SELECT * FROM departments
    WHERE dept_id = @dept_id AND is_deleted = 0
END