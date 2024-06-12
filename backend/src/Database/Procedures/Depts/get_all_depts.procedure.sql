CREATE OR ALTER PROCEDURE get_all_depts
AS
BEGIN
    SELECT * FROM departments
    WHERE is_deleted = 0
END