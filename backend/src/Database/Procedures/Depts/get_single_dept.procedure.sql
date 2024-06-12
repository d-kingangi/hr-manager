CREATE OR ALTER PROCEDURE get_single_dept
AS
BEGIN
    SELECT * FROM departments
    WHERE dept_id = @dept_id
END